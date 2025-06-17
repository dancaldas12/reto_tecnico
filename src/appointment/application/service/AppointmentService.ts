import { Injectable, Logger } from "@nestjs/common";
import { AppointmentDomainService } from "../../domain/service/AppointmentService";
import CustomException from "../../../common/application/exception/CustomException";
import { AppointmentSaveDto } from "../dto/AppointmentSaveDto";
import { AppointmentDto } from "../dto/AppointmentDto";

@Injectable()
export class AppointmentApplicationService {
    private readonly appointmentDomainService: AppointmentDomainService;
    private readonly logger: Logger = new Logger(AppointmentApplicationService.name);
    
    constructor(appointmentDomainService: AppointmentDomainService) {
        this.appointmentDomainService = appointmentDomainService;
    }

    public async getAppointmentsApplication(payload: AppointmentDto): Promise<any> {
        const { insuredId } = payload;
        return this.appointmentDomainService.getAppointmentsService(insuredId).catch((exception) => {
            this.logger.error(JSON.stringify(exception));
            throw new CustomException({
                code: exception.code,
                message: exception.message,
                httpStatus: exception.httpCode,
                details: exception.details || [],
                exception
            });
        });
    }

    public async createAppointmentApplication(payload: AppointmentSaveDto): Promise<any> {
        const { insuredId, scheduleId, countryISO } = payload;
        return this.appointmentDomainService.createAppointmentService(insuredId, scheduleId, countryISO).catch((exception) => {
            this.logger.error(JSON.stringify(exception));
            throw new CustomException({
                code: exception.code,
                message: exception.message,
                httpStatus: exception.httpCode,
                details: exception.details || [],
                exception
            });
        });
    }

    public async updateAppointmentApplication(payload: AppointmentDto): Promise<any> {
        const { insuredId } = payload;
        return this.appointmentDomainService.updateAppointmentsService(insuredId).catch((exception) => {
            this.logger.error(JSON.stringify(exception));
            throw new CustomException({
                code: exception.code,
                message: exception.message,
                httpStatus: exception.httpCode,
                details: exception.details || [],
                exception
            });
        });
    }
}