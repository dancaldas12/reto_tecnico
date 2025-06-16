import { Injectable, Logger } from "@nestjs/common";
import { PeruDomainService } from "../../domain/service/PeruService";
import CustomException from "../../../common/application/exception/CustomException";
import { CountryDto } from "../dto/CountryDto";

@Injectable()
export class PeruApplicationService {
    private readonly peruDomainService: PeruDomainService;
    private readonly logger: Logger = new Logger(PeruApplicationService.name);
    
    constructor(peruDomainService: PeruDomainService) {
        this.peruDomainService = peruDomainService;
    }

    public async save(payload: CountryDto): Promise<any> {
        const { insuredId, scheduleId, countryISO } = payload;
        return this.peruDomainService.save(insuredId, scheduleId, countryISO).catch((exception) => {
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
