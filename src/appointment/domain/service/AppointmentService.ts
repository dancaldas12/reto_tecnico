import { Inject, Injectable, Logger } from "@nestjs/common";
import { buildErrorResponse, buildOkResponse } from "../common/Util";
import { AppointmentRepository } from "../repository/AppointmentRepository";
import { SnsSupport } from "../../../common/application/supports";

@Injectable()
export class AppointmentDomainService {
    private readonly logger = new Logger(AppointmentDomainService.name);
    private readonly snsSupport: SnsSupport;

    constructor(
        @Inject("AppointmentRepository")
        private readonly appointmentRepository: AppointmentRepository,
    ) {
        this.snsSupport = new SnsSupport();
    }

    public async getAppointmentsService(insuredId: string): Promise<object> {
        this.logger.log(`Fetching appointments for insuredId: ${insuredId}`);
        const appointments = await this.appointmentRepository.getAppointmentsRepository(insuredId);

        if (!appointments || appointments.length === 0) {
            return buildErrorResponse(appointments);
        } else {
            return buildOkResponse(appointments);
        }
      }

    public async createAppointmentService(insuredId: string, scheduleId: string, countryISO: string): Promise<{ message: string, status: string }> {
        await this.appointmentRepository.saveAppointment(insuredId, scheduleId, countryISO);
        Logger.log( `DESTINO ${countryISO}`);
        const msg = await this.snsSupport.publish(
            process.env.SNS_TOPIC_ARN || "",
            JSON.stringify({
                insuredId,
                scheduleId,
                countryISO
            }),
            {
                "countryISO": { DataType: "String", StringValue: countryISO },
            }
        );
        Logger.log(`SNS message published: ${JSON.stringify(msg)}`);
        return { status: 'success' , message: "Agendamiento en proceso" };
    }

    public async updateAppointmentsService(insuredId: string, scheduleId: string): Promise<object> {
        this.logger.log(`Fetching appointments for insuredId: ${insuredId}`);
        await this.appointmentRepository.updateStatus(insuredId, scheduleId);

        // if (!appointments || appointments.length === 0) {
        //     return buildErrorResponse(appointments);
        // } else {
        //     return buildOkResponse(appointments);
        // }
      }
}
