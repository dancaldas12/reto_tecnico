import { INestApplicationContext } from '@nestjs/common';
import { PeruModule } from '../controller/PeruModule';
import { PeruController } from '../controller/PeruController';

const HandlerCore = (appContext: INestApplicationContext, action: string) => {
  const appointmentController = appContext.select(PeruModule).get(PeruController);

  if (appointmentController[action]) {
    return appointmentController;
  }
};

export default HandlerCore;