import { Controller, Get, Post, Body, Logger } from "@nestjs/common";
import { AppointmentRequestValidation } from "../../application/validation/AppointmentValidation";
import { RequestDto } from "../../../common/application/dto/RequestDto";
import { AppointmentApplicationService } from "../../application/service/AppointmentService";
import { AppointmentSaveDto } from "../../application/dto/AppointmentSaveDto";
import { AppointmentDto } from "../../application/dto/AppointmentDto";

@Controller()
export class AppointmentController {
    private readonly appointmentValidation: AppointmentRequestValidation;
    private readonly appointmentApplicationService: AppointmentApplicationService;

    constructor(appointmentValidation: AppointmentRequestValidation, appointmentApplicationService: AppointmentApplicationService) {
        this.appointmentValidation = appointmentValidation;
        this.appointmentApplicationService = appointmentApplicationService;

    }
    
    @Get("/appointments/:insuredId")
    public async getAppointments(request: RequestDto): Promise<object> {
        const payload = { ...request.payload, ...request.path };
        await this.appointmentValidation.getAppointments(payload as AppointmentDto);
        return this.appointmentApplicationService.getAppointmentsApplication(payload as AppointmentDto);
    }


    @Post("/appointments")
    public async createAppointment(@Body() request: RequestDto): Promise<object> {
        const payload = { ...request.payload };
        await this.appointmentValidation.createAppointment(payload as AppointmentSaveDto);
        return this.appointmentApplicationService.createAppointmentApplication(payload as AppointmentSaveDto);
    }


};