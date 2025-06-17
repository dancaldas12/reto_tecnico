import { Inject, Injectable, Logger } from "@nestjs/common";
import { buildErrorResponse, buildOkResponse, getScheduleId } from "../common/Util";
import { PeruRepository } from "../repository/PeruRepository";
import { Schedule } from "../entities/Schedule";
import { Espacio } from "../entities/Espacio";
import { sendEventToEventBridge } from "../../../common/application/supports/EventBrigde";

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
        await this.peruRepository.save(custom);
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
        return { status: 'success' , message: "Agendamiento en proceso" };
      }
}
