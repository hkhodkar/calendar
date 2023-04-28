import { UUID } from "angular2-uuid";

export interface Appointment {
  id: UUID,
  date: Date
  startTime: Date;
  endTime: Date
  description?: string;
}

