import { MySQLDatabase } from '../../../common/core';

type TCredentials = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

const defaultPort = 3306;

export const obtenerInstancia = () => {
  if (!process.env.MYSQL_LOCAL) {
    throw new Error('No credentials found');
  }

  const { host, port, user, password, database } = JSON.parse(process.env.MYSQL_LOCAL) as TCredentials;

  return MySQLDatabase.getInstance({
    host,
    port: port || defaultPort,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
};