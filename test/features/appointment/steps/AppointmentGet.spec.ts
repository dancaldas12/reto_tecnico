import { Logger } from '@nestjs/common';
import { handler } from '../../../../src/appointment/infrastructure/bootstrap/App';
import { buildRequest, dbExceptionMockRepository, mockResponse, mockRepository } from '../util/AWSUtil';

jest.mock('../../../../src/appointment/infrastructure/repository/DynamoDB');

const { loadFeature, defineFeature } = require('jest-cucumber');

const feature = loadFeature('../../Appointment.feature', { loadRelativePath: true, errors: true });

defineFeature(feature, (test) => {
  test('CASO001_Consultar el caso NRO_CASO', ({
    given,
    and,
    when,
    then
  }) => {
    let data: any;
    let request: { action: string; path: object };
    let response: { status: string; data: any };
    const action = 'getAppointments';

    given(/^la url tiene el (.*) insureId$/, (caso: string) => {
      const path = { insuredId: caso };
      request = buildRequest(action, {} , path, 'GET');
    });

    and(/^retorna los siguientes valores (.*)$/, (ruta: string) => {
        data = mockResponse(ruta);
      mockRepository(data);
    });

    when('envio la peticion al servicio', async () => {
      const invokeFunction = await handler(request, '');
      response = JSON.parse(invokeFunction.body);
    });

    then(
      /^deberia recibir una respuesta del API en un tiempo maximo de 5 segundos con (.*)$/,
      (status: string) => {

        expect(response.status).toEqual(status);
        if(response.status !== 'error') {
          expect(response.data).toEqual(data);
        }
      }
    );
  });

  test('CASO002_Registrar nuevo caso', ({
    given,
    and,
    when,
    then
  }) => {
    let data: any;
    let request: { action: string; body: object };
    let response: { status: string; message: any };
    const action = 'createAppointment';

    given(/^se registra un nuevo caso con los datos (.*) (.*) (.*)$/, (insuredId: string, scheduleId: number, countryISO: string) => {
      const body = { insuredId, scheduleId, countryISO };
      request = buildRequest(action, body , {}, 'POST');
    });

    and(/^retorna los siguientes valores (.*)$/, (ruta: string) => {
        data = mockResponse(ruta);
      mockRepository(data);
    });

    when('envio la peticion al servicio', async () => {
      const invokeFunction = await handler(request, '');
      response = JSON.parse(invokeFunction.body);
    });

    then(
      /^deberia recibir una respuesta del API en un tiempo maximo de 5 segundos con (.*)$/,
      (status: string) => {

        expect(response.status).toEqual(status);
        if(response.status !== 'error') {
          expect(response.message).toEqual(data.message);
        }
      }
    );
  });

});
