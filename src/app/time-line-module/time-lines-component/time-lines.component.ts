import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { UtilsService } from 'src/app/services/utils.service';
import { AppointmentFormComponent } from 'src/app/shared/appointment-form/appointment-form.component';
import { AppointmentFormModel } from 'src/app/shared/models/appointment-form.model';
import { Appointment } from 'src/app/shared/models/appointment.model';

@Component({
  selector: 'app-time-lines-component',
  templateUrl: './time-lines.component.html',
  styleUrls: ['./time-lines.component.scss']
})
export class TimeLinesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private utilService: UtilsService, public dialog: MatDialog) {
  }

  pageTitle: string = ''
  timeTable: string[] = [];
  appointments: Appointment[] = [];
  selectedDate!: Date;



  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res: any) => {
      const selectedDate = new Date(res['params'].selectedDate);
      this.pageTitle = selectedDate.toDateString();
      this.timeTable = this.timeTable.length == 0 ? this.utilService.generateTimeTable() : this.timeTable;
      this.appointments = this.utilService.appointmentData.filter(item => item.date.getDate() === selectedDate.getDate());
      this.selectedDate = selectedDate;
    })
  }



  onClickHour(index: number,) {
    let selectedTime = this.timeTable[index].split(":");
    let createSelectedDate = new Date(this.selectedDate);
    createSelectedDate.setHours(+selectedTime[0], +selectedTime[1])
    let data: AppointmentFormModel = {
      id: UUID.UUID(),
      date: this.selectedDate,
      editMode: false,
      startTime: createSelectedDate,
      endTime: createSelectedDate,
      index: index,
      deleteMode: false
    };
    let editObject = this.findAppointMent(index)
    if (editObject) {
      data.id = editObject.id,
        data.startTime = editObject.startTime,
        data.endTime = editObject.endTime,
        data.description = editObject.description ?? '',
        data.editMode = true
    }
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe((result: AppointmentFormModel) => {
      if (!result) return;
      if (result.deleteMode) {
        this.appointments = this.appointments.filter(item => item.id != result.id);
        this.utilService.appointmentData = [...this.utilService.appointmentData, ...this.appointments];
        return;
      }
      this.appointments = this.appointments.filter(item => item.id != result.id);
      this.appointments.push(result);
      this.utilService.appointmentData = [...this.utilService.appointmentData, ...this.appointments];
    });
  }

  getClass(value: string) {
    if (this.appointments.length === 0) return;
    let selectedItems: string[] = []
    this.appointments.forEach(element => {
      let startTime = element.startTime.toTimeString().split(' ')[0];
      let endTime = element.endTime.toTimeString().split(' ')[0];
      let startIndex = this.timeTable.findIndex(item => item == startTime);
      let endIndex = this.timeTable.findIndex(item => item == endTime);
      let appointmentHours = this.timeTable.slice(startIndex, endIndex + 1);
      appointmentHours.forEach(item => selectedItems.push(item))
    });
    if (selectedItems.some(item => item == value)) {
      return 'active-item'
    } else {
      return ''
    };
  }



  drop(event: CdkDragDrop<string[]>) {
    let appointment: Appointment = this.findAppointMent(event.previousIndex) as Appointment;
    let durationTime = this.diffMinutes(appointment);
    let newStartTime = this.timeTable[event.currentIndex];
    let startTime = new Date(appointment.date);
    startTime.setHours(+newStartTime.split(":")[0], + newStartTime.split(":")[1]);
    let endTIme = new Date(startTime);
    endTIme.setMinutes(startTime.getMinutes() + durationTime)
    appointment.startTime = startTime;
    appointment.endTime = endTIme;

  }

  private diffMinutes(appointment: Appointment) {
    var diff = (appointment.endTime.getTime() - appointment.startTime.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  private findAppointMent(index: number) {
    let selectedTime = this.timeTable[index].split(":");
    let createSelectedDate = new Date(this.selectedDate);
    createSelectedDate.setHours(+selectedTime[0], +selectedTime[1])
    let editObject = this.appointments.find(item => createSelectedDate.getTime() >= item.startTime.getTime() && createSelectedDate.getTime() <= item.endTime.getTime());
    return editObject;
  }
}
