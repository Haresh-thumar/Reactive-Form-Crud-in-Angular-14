import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getUrl: string = "http://localhost:3000/students";

  /************ Post Student Methods ************/
  postStudent(data: any) {
    return this.http.post<any>(this.getUrl, data).pipe(map((res: any) => { return res }));
  }

  /************ Get Student Methods ************/
  getStudents() {
    return this.http.get<any>(this.getUrl).pipe(map((res: any) => { return res }));
  }

  /************ Put Student Methods ************/
  upateStudent(id: number, data: any) {
    return this.http.put(`${this.getUrl}/${id}`, data).pipe(map((res: any) => { return res }));
  }

  /************ Delete Student Methods ************/
  deleteStudent(id: number) {
    return this.http.delete<any>(`${this.getUrl}/${id}`).pipe(map((res: any) => { return res }));
  }

  /************ Get Student Id By URL Methods ************/
  getStudentById(id: number) {
    return this.http.get<any>(`${this.getUrl}/${id}`).pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
