import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  form: FormGroup;
  teams = ['A', 'B'];

  constructor(private router: Router, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      emails: new FormArray([]),
      team: new FormControl('', Validators.required),
      hobby: new FormControl(null),
    });
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
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
      this.form.get('hobby').updateValueAndValidity();
    } else {
      this.form.get('hobby').setValidators(null);
      this.form.get('hobby').updateValueAndValidity();
    }
  }
}
