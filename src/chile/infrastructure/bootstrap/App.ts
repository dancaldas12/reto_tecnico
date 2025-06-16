import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';

import { INestApplication, Logger } from '@nestjs/common';
import { ChileController } from '../controller/ChileController';

let cachedApp: INestApplication | null = null;
let chileController: ChileController;

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  if (!cachedApp) {
    cachedApp = await NestFactory.create(AppModule);
    await cachedApp.init();
    chileController = cachedApp.get(ChileController);
  }

  let result: any;
  // GET /appointments
  Logger.log(`Received event: ${JSON.stringify(event)}`, 'Handler');
  if (event.method === 'GET') {
    result = await chileController.saveEvent(event);
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ message: 'Not found' }),
  };
};
