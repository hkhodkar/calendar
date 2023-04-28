import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  @Input() selectedDate!: Date;


  constructor(private router: Router, private util: UtilsService) {

  }
  ngOnInit(): void {
  }


  onSelectDate() {
    let splitDate = this.selectedDate.toLocaleDateString("en-US").replaceAll("/", "-");
    this.router.navigate([`date/${splitDate}`])
  }

}
