import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  // For Use Only Add/Remove Class
  submitted: boolean = false;

  // to check edit mode
  isEdit!: boolean;

  // For use only store params Id
  userId: any;

  // Form Group
  addStudentForm!: FormGroup;

  // create a New Student Object Model
  studentModelObj: studentModel = new studentModel();


  constructor(private api: StudentService, private toast: NgToastService, private router: ActivatedRoute, private route: Router, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.isEdit = this.router.snapshot.paramMap.get('id') as any;

    /*========== Assign New FormGroup with Form validation ==========*/
    this.addStudentForm = this.formbuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      age: ['', [Validators.required, Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      mobile: ['', [Validators.required, Validators.maxLength(10), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    })

    this.onEdit(this.studentModelObj);
  }

  /*========== Get Object from Router URL when click Edit Button & Patch Object ==========*/
  onEdit(item: studentModel) {
    this.studentModelObj.id = item.id;
    this.userId = this.api.getStudentById(this.router.snapshot.params['id']).subscribe((result) => {
      this.addStudentForm?.patchValue(result);
    });
  }


  /*========== Get Form-Controls For HTML File Validation ==========*/
  get f(): { [key: string]: AbstractControl } {
    return this.addStudentForm.controls;
  }


  /**************************************************************************************
                                    Add Student
  **************************************************************************************/
  postStudent() {
    /*--------- form valid after submit ---------*/
    if (this.addStudentForm.invalid) {
      return;
    }
    /*--------- Post Student Form Data & call api ---------*/
    this.api.postStudent(this.addStudentForm.value).subscribe({
      next: (res) => {
        // this.submitted = true;
        console.log(res);
      },
      error: (err) => this.toast.error({ detail: "ADD STUDENT ERROR", summary: 'error while Add Student', duration: 5000, position: 'br' }),
      complete: () => {
        this.toast.success({ detail: "ADD STUDENT", summary: 'Create Use successfully!!', duration: 7000, position: 'br' });
        /*--------- Reset Form ---------*/
        this.addStudentForm.reset(this.addStudentForm = new FormGroup({}));
        /*--------- Submit after Redirect List Component ---------*/
        this.route.navigate(['/list']);
      }
    })
  }


  /**************************************************************************************
                                      Edit Student
  **************************************************************************************/
  putStudent() {
    /*-------- find id in url --------*/
    this.userId = this.router.snapshot.paramMap.get('id');

    this.api.upateStudent(this.userId, this.addStudentForm.value).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => this.toast.error({ detail: "UPDATE STUDENT ERROR", summary: 'error while Update Student!', duration: 5000, position: 'br' }),
      complete: () => {
        this.toast.success({ detail: "UPDATE STUDENT", summary: 'Student Update successfully!!', duration: 5000, position: 'br' });
        /*--------- Reset Form ---------*/
        this.addStudentForm.reset(this.addStudentForm = new FormGroup({}));
        /*--------- Submit after Redirect List Component ---------*/
        this.route.navigate(['/list']);
      }
    });
  }


  /**************************************************************************************
                                      Cancel Student
  **************************************************************************************/
  cancelEdit() {
    /*--------- Reset Form ---------*/
    this.addStudentForm.reset(this.addStudentForm = new FormGroup({}));
    /*--------- Submit after Redirect List Component ---------*/
    this.route.navigate(['/list']);
  }


}


/*---- Student Object Model for addStudentForm ----*/
export class studentModel {
  id: number = 0;
  name: string = '';
  email: string = '';
  age: number = 0;
  mobile: number = 0;
}
