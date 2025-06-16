import { PeruMysqlDBRepository } from '../../../../src/peru/infrastructure/repository/PeruMysqlDBRepository';

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
    .spyOn(PeruMysqlDBRepository.prototype, 'save')
    .mockImplementation(() => Promise.resolve(mockData));
};

export const dbExceptionMockRepository = () => {
  jest.spyOn(PeruMysqlDBRepository.prototype, 'save').mockImplementation(() => {
    throw new Error('Database Exception');
  });
};