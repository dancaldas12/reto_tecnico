import { Inject, Injectable, Logger } from "@nestjs/common";
import { buildErrorResponse, buildOkResponse, getScheduleId } from "../common/Util";
import { ChileRepository } from "../repository/ChileRepository";
import { Schedule } from "../entities/Schedule";
import { Espacio } from "../entities/Espacio";
import { sendEventToEventBridge } from "../../../common/application/supports/EventBrigde";

@Injectable()
export class ChileDomainService {
    private readonly logger = new Logger(ChileDomainService.name);

    constructor(
        @Inject("ChileRepository")
        private readonly chileRepository: ChileRepository
    ) { }

    public async save(insuredId: string, scheduleId: string, countryISO: string): Promise<object> {
        this.logger.log(`Fetching appointments for insuredId, scheduleId, countryISO: ${insuredId}, ${scheduleId}, ${countryISO}`);

        let espacio: Espacio = getScheduleId(scheduleId);
        const custom: Schedule = { espacio, insuredId, scheduleId, countryISO };
        await this.chileRepository.save(custom);
        await sendEventToEventBridge(
            "transaction",
            "dico-api-citamed",
            {
                insuredId: custom.insuredId,
                scheduleId: custom.scheduleId,
                countryISO: custom.countryISO,
                date: custom.espacio.date,
                centerId: custom.espacio.centerId,
                medicId: custom.espacio.medicId,
                specialtyId: custom.espacio.specialtyId
            },
            'default'
        )
        return { status: 'success', message: "Agendamiento en proceso" };
    }
}
