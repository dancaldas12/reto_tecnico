import { INestApplicationContext } from '@nestjs/common';
import { ChileModule } from '../controller/ChileModule';
import { ChileController } from '../controller/ChileController';

const HandlerCore = (appContext: INestApplicationContext, action: string) => {
  const appointmentController = appContext.select(ChileModule).get(ChileController);

  if (appointmentController[action]) {
    return appointmentController;
  }
};

export default HandlerCore;