// tools/swagger.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/appointment/infrastructure/bootstrap/AppModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function generateSwagger() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Appointment API')
    .setDescription(`## 📌 Descripción

Esta API forma parte del reto técnico para el puesto de Desarrollador Backend Senior en Rimac. Permite:

- 📅 Registrar nuevas citas médicas
- 🔍 Consultar citas médicas registradas por ID de asegurado

### 🔧 Tecnologías utilizadas
- Node.js + TypeScript
- NestJS + AWS Lambda (Serverless Framework)
- DynamoDB, SNS, SQS, EventBridge, MySQL
- Swagger para documentación

### 📚 Endpoints disponibles

#### GET /appointments/{insuredId}
Consulta las citas de un asegurado usando su ID (`insuredId`).

#### POST /appointments
Registra una nueva cita médica y la envía a procesamiento asíncrono.

👨‍💻 Desarrollado por: Danny Caldas
🗓️ Fecha de entrega: 16/06/2025`)
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'apiKey')
    .addTag('appointments')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  console.log('✅ Swagger file generated: swagger.json');

  await app.close();
}

generateSwagger();
