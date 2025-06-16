import { Injectable, Logger } from "@nestjs/common";
import { ChileDomainService } from "../../domain/service/ChileService";
import CustomException from "../../../common/application/exception/CustomException";
import { CountryDto } from "../dto/CountryDto";

@Injectable()
export class ChileApplicationService {
    private readonly chileDomainService: ChileDomainService;
    private readonly logger: Logger = new Logger(ChileApplicationService.name);
    
    constructor(chileDomainService: ChileDomainService) {
        this.chileDomainService = chileDomainService;
    }

    public async save(payload: CountryDto): Promise<any> {
        const { insuredId, scheduleId, countryISO } = payload;
        return this.chileDomainService.save(insuredId, scheduleId, countryISO).catch((exception) => {
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
