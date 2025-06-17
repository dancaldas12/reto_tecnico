import { Inject, Injectable, Logger } from "@nestjs/common";
import { buildErrorResponse, buildOkResponse, getScheduleId } from "../common/Util";
import { ChileRepository } from "../repository/ChileRepository";
import { Schedule } from "../entities/Schedule";
import { Espacio } from "../entities/Espacio";

@Injectable()
export class ChileDomainService {
    private readonly logger = new Logger(ChileDomainService.name);

    constructor(
        @Inject("ChileRepository")
        private readonly chileRepository: ChileRepository
    ) {}

    public async save(insuredId: string, scheduleId: string, countryISO: string): Promise<object> {
        this.logger.log(`Fetching appointments for insuredId, scheduleId, countryISO: ${insuredId}, ${scheduleId}, ${countryISO}`);

        let espacio: Espacio = getScheduleId(scheduleId);
        const custom: Schedule = { espacio, insuredId, scheduleId, countryISO };
        const appointments = await this.chileRepository.save(custom);
        
        return { status: 'success' , message: "Agendamiento en proceso" };
      }
}
