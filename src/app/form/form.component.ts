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
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.dataService.addStudent({
      ...this.form.value,
      id: Math.random().toString(16).slice(5),
      selected: false,
    });
    (<FormArray>this.form.get('emails')).controls = [];
    this.form.reset();
    this.router.navigate(['/data']);
  }

  onAddEmail() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.form.get('emails')).push(control);
  }

  get controls() {
    return (<FormArray>this.form.get('emails')).controls;
  }

  deleteEmail(index: number) {
    (<FormArray>this.form.get('emails')).removeAt(index);
  }
}
