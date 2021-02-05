import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grade } from './grade';
import { Student } from './student';
import { StudentLevel } from './student-level';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private REST_API_SERVER = "http://localhost:3000/students";
  
  private headers = new HttpHeaders({
    'Content-Type':'application/json'
  });

  constructor(private httpClient: HttpClient) { }

  public getGrades() {
    return this.httpClient.get<Grade[]>(this.REST_API_SERVER+'/grades');
  }

  public getStudents() {
    return this.httpClient.get<Student[]>(this.REST_API_SERVER);
  }

  public addStudent(studentLevel: StudentLevel) {
    const body = JSON.stringify(studentLevel);
    return this.httpClient.post<any>(this.REST_API_SERVER, body, { headers: this.headers });
  }

  public deleteStudent(id) {
    return this.httpClient.delete<any>(this.REST_API_SERVER+'/'+id);
  }

}
