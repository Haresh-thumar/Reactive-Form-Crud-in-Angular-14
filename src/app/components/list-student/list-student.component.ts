import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  allStudent: any = [];

  constructor(private student: StudentService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  openSuccess() {
    this.toast.success({ detail: 'BOTTOM RIGHT', summary: 'Bottom Right', sticky: true, position: 'br' })
  }

  /******************* Get Data *******************/
  getAllStudent() {
    this.student.getStudents().subscribe({
      next: (result) => { this.allStudent = result },
      error: (err) => this.toast.error({ detail: "STUDENT FETCH FAILED", summary: 'Student Data Fetching Failed!', duration: 4000, position: 'br' }),
      complete: () => {
        this.toast.success({ detail: "STUDENT FETCH", summary: 'Student Data Fetch Successfully!', duration: 3000, position: 'br' });
      },
    });
  }

  /****************** Delete Data ******************/
  deleteStudent(delStu: any) {
    this.student.deleteStudent(delStu).subscribe({
      next: (res) => { return res },
      error: (err) => this.toast.error({ detail: "DELETE ERROR", summary: 'Delete Student UnSuccessfull!', duration: 4000, position: 'br' }),
      complete: () => {
        this.toast.success({ detail: "DELETE STUDENT", summary: 'Delete Student Successfully!', duration: 3000, position: 'br' });
        setTimeout(() => {
          this.getAllStudent();
        }, 5000);
      },
    })
  }

}
