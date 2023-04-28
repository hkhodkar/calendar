import { Injectable } from '@angular/core';
import { Appointment } from '../shared/models/appointment.model';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  timeTable: string[] = [];

  appointmentData: Appointment[] = [
    { id: UUID.UUID(), date: new Date("April 13, 2014 11:00:00"), startTime: new Date("April 13, 2014 11:00:00"), endTime: new Date("April 13, 2014 12:00:00") },
    { id: UUID.UUID(), date: new Date("April 13, 2014 11:00:00"), startTime: new Date("April 13, 2014 03:00:00"), endTime: new Date("April 13, 2014 4:00:00") },
    { id: UUID.UUID(), date: new Date("April 13, 2014 11:00:00"), startTime: new Date("April 13, 2014 7:00:00"), endTime: new Date("April 13, 2014 8:00:00") },
  ]

  generateTimeTable() {
    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < 4; j++) {
        this.timeTable.push(
          `${i > 10 ? i : `0${i}`}:${j === 0 ? `00` : 15 * j}:00`,
        )
      }
    }
    return this.timeTable;
  }

}
