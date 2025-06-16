import { Controller, Get, Post, Body } from "@nestjs/common";
import { RequestDto } from "../../../common/application/dto/RequestDto";
import { PeruApplicationService } from "../../application/service/PeruService";
import { CountryDto } from "../../application/dto/CountryDto";

@Controller()
export class PeruController {
    private readonly peruApplicationService: PeruApplicationService;

    constructor(peruApplicationService: PeruApplicationService) {
        this.peruApplicationService = peruApplicationService;

    }
    
    public async saveEvent(request: RequestDto): Promise<object> {
        const payload = { ...request.payload };
        return this.peruApplicationService.save(payload as CountryDto);
    }


};