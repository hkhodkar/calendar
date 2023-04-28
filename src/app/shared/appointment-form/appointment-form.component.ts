import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UUID } from 'angular2-uuid';
import { AppComponent } from 'src/app/app.component';
import { UtilsService } from 'src/app/services/utils.service';
import { Appointment } from '../models/appointment.model';
import { AppointmentFormModel } from '../models/appointment-form.model';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {


  form!: FormGroup;
  editMode: boolean = false;
  selectedTime: string[] = [];

  get endTime() { return this.form.get('endTime'); }
  get startTime() { return this.form.get('startTime'); }


  constructor(
    private fb: FormBuilder,
    private util: UtilsService,
    public dialogRef: MatDialogRef<AppointmentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AppointmentFormModel) { }

  ngOnInit(): void {
    this.selectedTime = this.util.generateTimeTable();
    this.createForm()
    this.editMode = this.data.editMode;
  }


  createForm() {
    let startTime = this.data?.startTime?.getHours().toString().padStart(2, '0') + ':' + this.data.startTime.getMinutes().toString().padStart(2, '0') + ":" + "00";
    let endTime = this.data?.endTime?.getHours().toString().padStart(2, '0') + ':' + this.data.endTime.getMinutes().toString().padStart(2, '0') + ":" + "00";
    let startTimeIndex = this.selectedTime.findIndex(item => item == startTime);
    let endTimeIndex = this.selectedTime.findIndex(item => item == endTime);
    this.form = this.fb.group({
      id: [this.data.id],
      date: [this.data.date],
      startTime: [this.selectedTime[startTimeIndex]],
      endTime: [this.selectedTime[endTimeIndex], Validators.required],
      description: [this.data.description]
    })
  }

  deleteItem() {
    let appointment: AppointmentFormModel = this.createAppointment();
    appointment.deleteMode = true;
    this.dialogRef.close(appointment)

  }


  submit() {
    let appointment: AppointmentFormModel = this.createAppointment();
    this.dialogRef.close(appointment)
  }

  createAppointment(): AppointmentFormModel {
    let startTime = new Date(this.form.value.date);
    let endTime = new Date(this.form.value.date);
    startTime.setHours(+this.form.value.startTime.split(":")[0], + this.form.value.startTime.split(":")[1]);
    endTime.setHours(+this.form.value.endTime.split(":")[0], +this.form.value.endTime.split(":")[1]);
    const appointment: AppointmentFormModel = {
      index: this.data.index,
      id: this.form.value.id,
      date: this.form.value.date,
      startTime: startTime,
      endTime: endTime,
      description: this.form.value.description,
      editMode: this.data.editMode,
      deleteMode: this.data.deleteMode
    }
    return appointment;
  }
}
