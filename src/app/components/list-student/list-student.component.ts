import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {

  allStudent: any = [];

  constructor(private student: StudentService, private toast: NgToastService, private route: Router) { }

  ngOnInit(): void {
    this.getAllStudent();
  }


  /******************* Get Data *******************/
  getAllStudent() {
    this.student.getStudents().subscribe({
      next: (result) => { this.allStudent = result },
      error: (err) => this.toast.error({ detail: "STUDENT FETCH FAILED", summary: 'Student Data Fetching Failed!', duration: 4000, position: 'br' }),
      complete: () => {
        if (this.allStudent > 0) {
          this.toast.success({ detail: "STUDENT FETCH", summary: 'Student Data Fetch Successfully!', duration: 3000, position: 'br' });
        }
      },
    });
  }

  /****************** Delete Data ******************/
  deleteStudent(delStu: any) {
    this.student.deleteStudent(delStu).subscribe({
      next: (res) => { return res },
      error: (err) => this.toast.error({ detail: "DELETE DELETE", summary: 'Delete Student UnSuccessfull!', duration: 4000, position: 'br' }),
      complete: () => {
        this.getAllStudent();
        this.toast.success({ detail: "DELETE STUDENT", summary: 'Delete Student Successfully!', duration: 3000, position: 'br' });
      },
    })
  }


  trackByStudentid(index: number, student: any): string {
    return student.studentId;
  }

}
