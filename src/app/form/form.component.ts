import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data-service';
import { teamType } from '../data-transfer/data.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form: FormGroup;
  teams = ['A', 'B'];
  id: string = null;
  team: teamType;

  constructor(
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      emails: new FormArray([]),
      team: new FormControl('', Validators.required),
      hobby: new FormControl(null),
    });

    if (this.route.snapshot.params['id']) {
      this.id = this.route.snapshot.params['id'];
      this.team = this.route.snapshot.params['team'];
      this.patchValues();
    }
  }

  patchValues() {
    let student = this.dataService.getStudentById(this.id, this.team);
    console.log(student);
    this.form.patchValue(student);
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // student.emails.forEach((email) => {
    //   (<FormArray>this.form.get('emails')).controls.push(
    //     new FormControl(email, [
    //       Validators.required,
    //       Validators.pattern(emailPattern),
    //     ])
    //   );
    // });

    for (let email of student.emails) {
      (<FormArray>this.form.get('emails')).push(
        new FormControl(email, [
          Validators.required,
          Validators.pattern(emailPattern),
        ])
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.dataService.getStudentById(this.id, this.team)) {
        this.dataService.editStudent(this.id, this.form.value);
        console.log(this.form.value);
        this.router.navigate(['/data']);
        return;
      }

      this.dataService.addStudent({
        ...this.form.value,
        id: Math.random().toString(16).slice(5),
        selected: false,
      });
      (<FormArray>this.form.get('emails')).controls = [];
      this.form.reset();
      this.router.navigate(['/data']);
    }
  }

  onAddEmail() {
    const emailPattern: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const control = new FormControl(null, [
      Validators.required,
      Validators.pattern(emailPattern),
    ]);

    (<FormArray>this.form.get('emails')).push(control);
  }

  get controls() {
    return (<FormArray>this.form.get('emails')).controls;
  }

  deleteEmail(index: number) {
    (<FormArray>this.form.get('emails')).removeAt(index);
  }

  getEmailValidityByIndex(i: number) {
    return (
      (<FormArray>this.form.get('emails')).controls[i].invalid &&
      (<FormArray>this.form.get('emails')).controls[i].touched
    );
  }

  checkHobbyRequired(e) {
    if (e.target.checked) {
      this.form.get('hobby').setValidators([Validators.required]);
    } else {
      this.form.get('hobby').setValidators(null);
    }
    this.form.get('hobby').updateValueAndValidity();
  }
}
