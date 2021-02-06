import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Grade } from './grade';
import { Student } from './student';
import { StudentLevel } from './student-level';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private REST_API_SERVER = "http://localhost:3000/students";
  private REST_API_SERVER_UPLOAD = "http://localhost:3000/upload";
  private REST_API_SERVER_FILE = "http://localhost:3000/file";
  
  private headers = new HttpHeaders({
    'Content-Type':'application/json; charset=utf-8'
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
  public deleteFile(filename) {
    return this.httpClient.delete<any>(this.REST_API_SERVER_FILE+'/'+filename);
  }

  public uploadFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post<any>(this.REST_API_SERVER_UPLOAD, formData);
}

}
