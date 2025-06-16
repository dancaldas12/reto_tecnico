import { AppointmentRequest } from "../../../../application/dto/AppointmentRequest";

export interface AppointmentRepositoryPort {
  saveAppointment(appointment: AppointmentRequest & { status: string }): Promise<void>;
  getAppointmentsRepository(insuredId: string): Promise<any[]>;
}
