import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsImports } from './material-imports';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CalendarComponent,
    AppointmentFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...MaterialsImports
  ],
  exports: [
    ...MaterialsImports,
    ReactiveFormsModule,
    CalendarComponent
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class SharedModule { }
