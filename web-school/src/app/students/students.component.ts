import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddStudentComponent } from './add-student/add-student.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { Student } from './student';
import { StudentsService } from './students.service';

/* const ELEMENT_DATA: Student[] = [
  {id:1, nombres: "Tony A.", apePat: "Sanchez", apeMat: "Escalante", grado:"4to Grado Sec", fechNac: new Date("1996-02-12T00:00:00"), fotoRuta: "/foto/profile1.jpg"},
  {id:2, nombres: "Jimmy E.", apePat: "Sanchez", apeMat: "Escalante", grado:"5to Grado Sec", fechNac: new Date("1987-01-01T00:00:00"), fotoRuta: "/foto/profile2.jpg"},
  {id:3, nombres: "Maycon E.", apePat: "Sanchez", apeMat: "Escalante", grado:"6to Grado Sec", fechNac: new Date("1985-11-19T00:00:00"), fotoRuta: "/foto/profile3.jpg"}
]; */

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
  
  displayedColumns: string[] = ['nid_persona', 'nom_persona', 'ape_pate_pers', 'ape_mate_pers', 'nid_grado', 'fecha_naci', 'foto_ruta', 'accion'];
  
  dataSource: any;
  ngOnInit(): void {
    this.loadStudents();
/*     setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.students);
    }, 1000); */
    //this.dataSource = new MatTableDataSource(ELEMENT_DATA);
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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '500px',
      data: '',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.confirmDelete = result;
      if(this.confirmDelete == 'yes'){
        this.loadStudents();
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
      }
    });
  }

}
