import { ChileMysqlDBRepository } from '../../../../src/chile/infrastructure/repository/ChileMysqlDBRepository';                              
import { sendEventToEventBridge } from '../../../../src/common/application/supports/EventBrigde';

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
    .spyOn(ChileMysqlDBRepository.prototype, 'save')
    .mockImplementation(() => Promise.resolve(mockData));
};

export const dbExceptionMockRepository = () => {
  jest.spyOn(ChileMysqlDBRepository.prototype, 'save').mockImplementation(() => {
    throw new Error('Database Exception');
  });
};