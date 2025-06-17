import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { INestApplication, Logger } from '@nestjs/common';
import { PeruController } from '../controller/PeruController';

let cachedApp: INestApplication | null = null;
let peruController: PeruController;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!cachedApp) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();
    peruController = cachedApp.get(PeruController);
  }

  let result: any;
  // GET /appointments
  Logger.log(`Received event: ${JSON.stringify(event)}`, 'Handler');
  if (event.Records && event.Records.length > 0) {
    let customEvent = JSON.parse(event.Records[0].body)
    customEvent.payload = JSON.parse(customEvent.Message);
    result = await peruController.saveEvent(customEvent);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }

  // return {
  //   statusCode: 404,
  //   body: JSON.stringify({ message: 'Not found' }),
  // };
};
