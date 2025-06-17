import { Injectable, Logger } from "@nestjs/common";
import Joi from "joi";
import { validate } from "../../../common/application/validation/Validator";
import { AppointmentDto } from "../dto/AppointmentDto";
import { AppointmentSaveDto } from "../dto/AppointmentSaveDto";

@Injectable()
export class AppointmentRequestValidation {
    public async getAppointments(payload: AppointmentDto): Promise<void> {
        const schema = Joi.object({
            insuredId: Joi.string()
                .required()
                .empty('')
                .pattern(/^[\d]{5}$/)
                .max(5)
                .message('El campo insuredId es obligatorio y debe contener 5 dígitos.')
        }).unknown(true); // Permite campos adicionales
        await validate(schema, payload);
    }

    public async createAppointment(payload: AppointmentSaveDto): Promise<void> {
        Logger.log(`Validating createAppointment with payload: ${JSON.stringify(payload)}`);
        // try {
        const schema = Joi.object({
            insuredId: Joi.string()
                .required()
                .empty('')
                .pattern(/^[\d]{5}$/)
                .max(5)
                .message('El campo insuredId es obligatorio y debe contener 5 dígitos.'),
            scheduleId: Joi.string()
                .required(),
            countryISO: Joi.string()
                .required()
        }).unknown(true); // Permite campos adicionales
        await validate(schema, payload);
        // } catch (error) {
        //     Logger.error(`Validation error in createAppointment: ${JSON.stringify(error)}`);
        // }
    }
}

