import { Controller, Get, Post, Body } from "@nestjs/common";
import { RequestDto } from "../../../common/application/dto/RequestDto";
import { ChileApplicationService } from "../../application/service/ChileService";
import { CountryDto } from "../../application/dto/CountryDto";

@Controller()
export class ChileController {
    private readonly chileApplicationService: ChileApplicationService;

    constructor(chileApplicationService: ChileApplicationService) {
        this.chileApplicationService = chileApplicationService;

    }
    
    public async saveEvent(request: RequestDto): Promise<object> {
        const payload = { ...request.payload };
        return this.chileApplicationService.save(payload as CountryDto);
    }


};