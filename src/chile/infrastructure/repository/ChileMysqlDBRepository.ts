import { Injectable, Logger } from "@nestjs/common";
import { ChileRepository } from "../../domain/repository/ChileRepository";
import { INSERT } from "./queries/ChileQueries";
import { obtenerInstancia } from "./db";
import { Schedule } from "../../domain/entities/Schedule";

@Injectable()
export class ChileMysqlDBRepository implements ChileRepository {
  private readonly logger = new Logger(ChileMysqlDBRepository.name);

  public async save(custom: Schedule): Promise<any> {
    try {
      const instancia = obtenerInstancia();
      return instancia.executeQuery(INSERT, {
        insuredId: custom.insuredId,
        centerId: custom.espacio.centerId,
        medicalId: custom.espacio.medicId,
        specialtyId: custom.espacio.specialtyId,
        scheduleId: custom.scheduleId,
        countryISO: custom.countryISO,
        status: "completed",
        dateTime: custom.espacio.date,
      });
    } catch (error) {
      return; // No es necesario crear una bd
    }
  }
}