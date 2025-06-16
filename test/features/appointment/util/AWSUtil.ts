import { AppointmentDynamoDBRepository } from '../../../../src/appointment/infrastructure/repository/AppointmentDynamoDBRepository';
import { SnsSupport } from '../../../../src/common/application/supports';

export const buildRequest = (action: string, payload: object, path: any, method) => {
  const evento = require('../request/lambda.json');
  evento.action = action;
  evento.payload = payload;
  evento.path = path;
  evento.method = method;
  return evento;
};

export const mockResponse = (ruta: string) => {
    const objeto = require(`../response/${ruta}.json`);
    return objeto;
}

export const mockRepository = (mockData) => {
  jest
    .spyOn(AppointmentDynamoDBRepository.prototype, 'getAppointmentsRepository')
    .mockImplementation(() => Promise.resolve(mockData));
  
  jest
    .spyOn(AppointmentDynamoDBRepository.prototype, 'saveAppointment')
    .mockImplementation(() => Promise.resolve(mockData));
  
  jest
    .spyOn(SnsSupport.prototype, 'publish')
    .mockImplementation(() => Promise.resolve());
};

export const dbExceptionMockRepository = () => {
  jest.spyOn(AppointmentDynamoDBRepository.prototype, 'getAppointmentsRepository').mockImplementation(() => {
    throw new Error('Database Exception');
  });
};