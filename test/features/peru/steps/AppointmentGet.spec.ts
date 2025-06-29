import { Logger } from '@nestjs/common';
import { handler } from '../../../../src/peru/infrastructure/bootstrap/App';
import { buildRequest, dbExceptionMockRepository, mockResponse, mockRepository } from '../util/AWSUtil';

jest.mock('../../../../src/peru/infrastructure/repository/db');

const { loadFeature, defineFeature } = require('jest-cucumber');

const feature = loadFeature('../../Peru.feature', { loadRelativePath: true, errors: true });

defineFeature(feature, (test) => {
  test('CASO002_Registrar nuevo caso', ({
    given,
    and,
    when,
    then
  }) => {
    let data: any;
    let request = { Records: [ { body: '' } ] };
    let response: { status: string; message: any };
    const action = 'createAppointment';

    given(/^se registra un nuevo caso con los datos (.*) (.*) (.*)$/, (insuredId: string, scheduleId: number, countryISO: string) => {
      const body = JSON.stringify({
        Message: JSON.stringify({ insuredId, scheduleId, countryISO })
      });
      request.Records[0].body = body;
      // request = buildRequest(action, body , {}, 'POST');
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
