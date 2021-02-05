import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../student';
import { StudentLevel } from '../student-level';
import { Grade } from '../grade';
import { StudentsService } from '../students.service';

import * as moment from 'moment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  formGroup: FormGroup;
  grados: Grade[] = [];
  /* [
    {id:1, desc: 'Primero', nivel:'PRI'},
    {id:1, desc: 'Segundo', nivel:'PRI'},
    {id:1, desc: 'Primero', nivel:'SEC'},
    {id:1, desc: 'Tercero', nivel:'SEC'}
  ]; */
  date = new FormControl(new Date());
  birthday: Date;
  events: string[] = [];
  constructor(private studentService: StudentsService ,private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddStudentComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.loadGrades();
    this.formGroup = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.maxLength(40)] ],
      apePat: ['',[Validators.required, Validators.maxLength(40)] ],
      apeMat: ['',[Validators.required, Validators.maxLength(40)] ],
      grado: [null, Validators.required],
      edad: [''],
      ruta: ['',Validators.required]
    });
    
  }
  loadGrades(){
    this.studentService.getGrades()
    .subscribe((data) => {
      this.grados = data;
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.edad.setValue(this.calcularEdad(event.value));
    this.birthday = new Date(event.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(){
    let studentLevel : StudentLevel;
    let formattedDate = (moment(this.birthday)).format('YYYY-MM-DD')
    console.log(formattedDate);
    studentLevel =  {    
      xnombre: this.nombres.value,
      xape_pat: this.apePat.value,
      xape_mat: this.apeMat.value,
      xid_grado: Number(this.grado.value),
      xfecha_naci: formattedDate,//this.birthday,
      xfoto_ruta: this.ruta.value,
      xnivel: 'INI'
    };
    console.log(studentLevel);

    this.studentService.addStudent(studentLevel)
    .subscribe((data) => {
      this.grados = data;
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

  get nombres() {
    return this.formGroup.get('nombres');
  }
  get apePat() {
    return this.formGroup.get('apePat');
  }
  get apeMat() {
    return this.formGroup.get('apeMat');
  }
  get grado() {
    return this.formGroup.get('grado');
  }
  get edad() {
    return this.formGroup.get('edad');
  }
  get ruta() {
    return this.formGroup.get('ruta');
  }

}
