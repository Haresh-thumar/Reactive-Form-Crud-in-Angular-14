import { Component, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent implements OnInit {

  //Add pagination in Table
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [5, 10, 15, 25, 50];

  // JSON Data store in Object
  allStudent: any = [];

  constructor(private student: StudentService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  //Pagination Function
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllStudent();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllStudent();
  }


  /**************************************************************************************
                                      Get Student
  **************************************************************************************/
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


  /**************************************************************************************
                                      Delete Student
  **************************************************************************************/
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

  /************* TrackBy For Loop Function ***********/
  trackByStudentid(index: number, student: any): string {
    return student.studentId;
  }

}


