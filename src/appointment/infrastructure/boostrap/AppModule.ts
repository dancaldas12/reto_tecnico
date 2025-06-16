import { Module } from '@nestjs/common';

import { AppointmentModule } from '../controller/AppointmentModule';

const modules = [AppointmentModule];

@Module({
  imports: [...modules]
})
export class AppModule {}