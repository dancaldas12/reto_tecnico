import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { INestApplication, Logger } from '@nestjs/common';
import { AppointmentController } from '../controller/AppointmentController';

let cachedApp: INestApplication | null = null;
let appointmentController: AppointmentController;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!cachedApp) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();
    appointmentController = cachedApp.get(AppointmentController);
  }

  // Aquí debes enrutar manualmente el evento a tu controlador
  // Esto es complejo y no recomendado, pero aquí tienes un ejemplo simple:
  // Supón que tienes un controlador para GET /hello
  let result: any;
  if (event.Records && event.Records.length > 0) {
    let customEvent = JSON.parse(event.Records[0].body)
    customEvent.payload = customEvent.Message;
    result = await appointmentController.updateAppointment(customEvent);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }
  // GET /appointments
  Logger.log(`Received event: ${JSON.stringify(event)}`, 'Handler');
  if (event.method === 'GET') {
    result = await appointmentController.getAppointments(event);
  }

  // POST /appointments
  if (event.method === 'POST') {
    result = await appointmentController.createAppointment(event);
  }

  if (result) {
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found' }),
  };
};