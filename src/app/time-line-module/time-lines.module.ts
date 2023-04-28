import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLinesComponent } from './time-lines-component/time-lines.component';
import { SharedModule } from '../shared/shared.module';
import { TimelinesRoutingModule } from './time-line-router.module';



@NgModule({
  declarations: [
    TimeLinesComponent
  ],
  imports: [
    TimelinesRoutingModule,
    SharedModule,
    CommonModule
  ],
  exports: [CommonModule]
})
export class TimeLinesModule { }
