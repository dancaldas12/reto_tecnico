export interface AppointmentRepository {
  getAppointmentsRepository(insuredId: string): Promise<any>;
  updateStatus(insuredId: string): Promise<any>;
  saveAppointment(insuredId: string, scheduleId: string, countryISO: string): Promise<void>;
}