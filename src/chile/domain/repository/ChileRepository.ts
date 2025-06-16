import { Schedule } from "../entities/Schedule";

export interface ChileRepository {
  save(custom: Schedule): Promise<any>;
}