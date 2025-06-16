import { Schedule } from "../entities/Schedule";

export interface PeruRepository {
  save(custom: Schedule): Promise<any>;
}