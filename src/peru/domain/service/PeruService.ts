import { Inject, Injectable, Logger } from "@nestjs/common";
import { buildErrorResponse, buildOkResponse, getScheduleId } from "../common/Util";
import { PeruRepository } from "../repository/PeruRepository";
import { Schedule } from "../entities/Schedule";
import { Espacio } from "../entities/Espacio";

@Injectable()
export class PeruDomainService {
    private readonly logger = new Logger(PeruDomainService.name);

    constructor(
        @Inject("PeruRepository")
        private readonly peruRepository: PeruRepository
    ) {}

    public async save(insuredId: string, scheduleId: string, countryISO: string): Promise<object> {
        this.logger.log(`Fetching appointments for insuredId, scheduleId, countryISO: ${insuredId}, ${scheduleId}, ${countryISO}`);

        let espacio: Espacio = getScheduleId(scheduleId);
        const custom: Schedule = { espacio, insuredId, scheduleId, countryISO };
        const appointments = await this.peruRepository.save(custom);
        
        if (!appointments || appointments.length === 0) {
            return buildErrorResponse(appointments);
        } else {
            return buildOkResponse(appointments);
        }
      }
}
