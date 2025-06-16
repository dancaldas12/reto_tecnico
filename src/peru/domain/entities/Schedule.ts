import { Espacio } from "./Espacio";

export interface Schedule {
    insuredId: string;
    scheduleId: string;
    countryISO: string;
    espacio: Espacio;
}