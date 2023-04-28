import { UUID } from "angular2-uuid"

export interface AppointmentFormModel {
  id: UUID,
  startTime: Date,
  endTime: Date,
  index: number,
  date: Date,
  editMode: boolean,
  description?: string,
  deleteMode: boolean
}
