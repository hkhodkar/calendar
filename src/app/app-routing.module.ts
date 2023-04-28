import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: "date",
    loadChildren: () => import("./time-line-module/time-lines.module").then(m => m.TimeLinesModule),

  },
  {
    path: '',
    component: CalendarComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
