import { INestApplicationContext } from '@nestjs/common';
import { AppointmentModule } from '../controller/AppointmentModule';
import { AppointmentController } from '../controller/AppointmentController';

const HandlerCore = (appContext: INestApplicationContext, action: string) => {
  const appointmentController = appContext.select(AppointmentModule).get(AppointmentController);

  if (appointmentController[action]) {
    return appointmentController;
  }
};

export default HandlerCore;