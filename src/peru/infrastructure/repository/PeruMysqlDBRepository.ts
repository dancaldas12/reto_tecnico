import { Injectable, Logger } from "@nestjs/common";
import { PeruRepository } from "../../domain/repository/PeruRepository";
import { INSERT } from "./queries/PeruQueries";
import { obtenerInstancia } from "./db";
import { Schedule } from "../../domain/entities/Schedule";

@Injectable()
export class PeruMysqlDBRepository implements PeruRepository {
  private readonly logger = new Logger(PeruMysqlDBRepository.name);

  public async save(custom: Schedule): Promise<any> {
    const instancia = obtenerInstancia();
    return instancia.executeQuery(INSERT, {
      insuredId: ${custom.insuredId},
      centerId: ${custom.espacio.centerId},
      medicalId: ${custom.espacio.medicId},
      specialtyId: ${custom.espacio.specialtyId},
      scheduleId: ${custom.scheduleId},
      countryISO: ${custom.countryISO},
      status: completed,
      dateTime: ${custom.espacio.date},
    });
  }
}