import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getUrl: string = "http://localhost:3000/students";

  /* Get Student Methods */
  getStudents() {
    return this.http.get(this.getUrl);
  }

  /* Post Student Methods */
  saveStudent(data: any) {
    return this.http.post(this.getUrl, data);
  }

  /* Delete Student Methods */
  deleteStudent(id: any) {
    return this.http.delete(`${this.getUrl}/${id}`);
  }
}
