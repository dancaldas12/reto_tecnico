export interface AppointmentRepository {
  getAppointmentsRepository(insuredId: string): Promise<any>;
  saveAppointment(insuredId: string, scheduleId: number, countryISO: string): Promise<void>;
}