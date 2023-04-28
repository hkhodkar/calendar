import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TimeLinesComponent } from "./time-lines-component/time-lines.component";


const routes: Routes = [
  {
    path: ':selectedDate',
    component: TimeLinesComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimelinesRoutingModule { }
