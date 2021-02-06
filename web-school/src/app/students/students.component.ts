import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentComponent } from './add-student/add-student.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { Student } from './student';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  animal: string;
  confirmDelete: string;
  name: string;
  students: Student[] = [];
  constructor(private studentService: StudentsService, public dialog: MatDialog) { }
  
  displayedColumns: string[] = ['foto_ruta', 'nom_persona', 'fecha_naci', 'grado', 'accion'];
  
  dataSource: any;
  ngOnInit(): void {
    this.loadStudents();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadStudents(){
    this.studentService.getStudents()
    .subscribe((data) => {
      this.students = data;
    });
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.students);
    }, 1000);
  }

  deletStudentById(id){
    this.studentService.deleteStudent(id)
    .subscribe((data) => {
    });
  }
  deletFileByName(filename){
    this.studentService.deleteFile(filename)
    .subscribe((data) => {
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '500px',
      data: '',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmDelete = result;
      if(this.confirmDelete == 'yes'){
        setTimeout(() => {
          this.loadStudents();
        }, 1000);
      }
    });
  }

  removeStudent(element){
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: '',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmDelete = result;
      if(this.confirmDelete == 'yes'){
        this.deletStudentById(element.nid_persona);
        setTimeout(() => {
          this.loadStudents();
        }, 1000);
        /* setTimeout(() => {
          const ruta = element.foto_ruta;
          const rutaSplit = ruta.split('/photos/');
          const name = rutaSplit[1];
          this.deletFileByName(name);
        }, 1000); */
      }
    });
  }

  calcularEdad(selectedDate): string{
    const birthDate =  new Date(selectedDate);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if(today.getMonth() < birthDate.getMonth()) {
        age--;
        months = today.getMonth() + 12 - birthDate.getMonth();
    }

    if(today.getMonth() == birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
        age--;
        months = today.getMonth() + 12 - birthDate.getMonth();
    }

    if(age > 0 && today.getMonth() > birthDate.getMonth() && today.getDate() < birthDate.getDate()) {
      months--;
  }
    return age +' año(s) '+ months + ' mes(es)';
  }

}
