// import instana from '@instana/aws-lambda';
import middy from '@middy/core';
import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// import { eventSourceMiddleware, requestMiddleware, ssmMiddleware } from '../../../common/core';
// import { CustomLoggerSupport } from '../../../common/application/supports';
import { AppModule } from './AppModule';
import handleRequest from './HandlerCore';

let appContext: INestApplicationContext;
let wrapper: any;

const removeCircularReferences = (obj: any, seen: WeakSet<any> = new WeakSet()): any => {
  if (obj && typeof obj === 'object') {
    if (seen.has(obj)) {
      return '[Circular]';
    }
    seen.add(obj);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = removeCircularReferences(obj[key], seen);
      }
    }
    seen.delete(obj);
  }
  return obj;
};

const bootstrap = async (
  event: APIGatewayProxyEvent & { source: string; payload: any },
  context
): Promise<APIGatewayProxyResult> => {
  if (!appContext) {
    appContext = await NestFactory.createApplicationContext(AppModule, {
      logger: false
    });
    // appContext.useLogger(new CustomLoggerSupport('Siniestro'));
  }

  const { action } = event;
  removeCircularReferences(event.payload);

  return handleRequest(appContext, action);
};

// if (process.env.IS_OFFLINE === 'true') {

// wrapper = middy(bootstrap).use(requestMiddleware()).use(ssmMiddleware()).use(eventSourceMiddleware());
wrapper = middy(bootstrap);
// } else {
  // wrapper = instana.wrap(middy(bootstrap).use(requestMiddleware()).use(ssmMiddleware()).use(eventSourceMiddleware()));
// }

export const handler = wrapper;