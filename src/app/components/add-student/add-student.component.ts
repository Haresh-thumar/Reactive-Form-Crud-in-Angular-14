import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  submitted = false;

  constructor(private student: StudentService, private toast: NgToastService) { }

  addStudentForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    age: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  });

  ngOnInit(): void { }

  get f(): { [key: string]: AbstractControl } {
    return this.addStudentForm.controls;
  }

  /******************* Submit Form *******************/
  saveData() {
    if (this.addStudentForm.invalid) {
      return;
    }
    this.student.saveStudent(this.addStudentForm.value).subscribe({
      next: (result) => {
        this.submitted = true;
        console.log(result);
      },
      error: (err) => this.toast.error({ detail: "SUCCESS", summary: 'error while Add Student', duration: 7000, position: 'br' }),
      complete: () => {
        this.toast.success({ detail: "SUCCESS", summary: 'Create Use successfully!!', duration: 7000, position: 'br' });
        this.addStudentForm = new FormGroup({
          name: new FormControl(),
          email: new FormControl(),
          age: new FormControl(),
          mobile: new FormControl(),
        });
      },
    });
  }

}



// Example Reference Site
/* https://stackblitz.com/edit/angular-14-form-validation?file=src%2Fapp%2Fapp.component.html */
