
import { Logger } from '@nestjs/common';
import mysql from 'mysql2/promise';

export class MySQLDatabase {
  private static readonly instances: Map<string, MySQLDatabase> = new Map();
  private readonly pool: mysql.Pool;
  private readonly logger: Logger = new Logger(MySQLDatabase.name);
  private isClosed: boolean = false;

  private constructor(private readonly config: mysql.PoolOptions) {
    this.pool = mysql.createPool({ ...this.config, namedPlaceholders: true });
  }

  static getInstance(config: mysql.PoolOptions): MySQLDatabase {
    const key = `${config.host}:${config.port}/${config.database}`;
    if (!MySQLDatabase.instances.has(key)) {
      MySQLDatabase.instances.set(key, new MySQLDatabase(config));
    }
    return MySQLDatabase.instances.get(key)!;
  }

  async executeQuery(query: string, params: Record<string, any>): Promise<any> {
    const connection = await this.obtenerPoolConnection();
    try {
      const paramsEscaped = this.escaping(params);
      const [preparedQuery, preparedParams] = this.prepareQuery(query, paramsEscaped);
      this.logger.debug(`Ejecutando query: ${preparedQuery} con parámetros: ${preparedParams}`);
      const [rows] = await connection.execute(preparedQuery, preparedParams);
      this.logger.debug('Se ejecutó correctamente la query con el siguiente resultado:', rows);
      return rows;
    } finally {
      this.liberarConexion(connection);
    }
  }

  async beginTransaction(): Promise<mysql.PoolConnection> {
    const connection = await this.obtenerPoolConnection();
    await connection.beginTransaction();
    return connection;
  }

  async commitTransaction(connection: mysql.PoolConnection): Promise<void> {
    try {
      await connection.commit();
    } finally {
      this.liberarConexion(connection);
    }
  }

  async rollbackTransaction(connection: mysql.PoolConnection): Promise<void> {
    try {
      await connection.rollback();
    } finally {
      this.liberarConexion(connection);
    }
  }

  private liberarConexion(connection: mysql.PoolConnection): void {
    connection.release();
    this.logger.log('Se liberó el pool de conexión.');
  }

  private async obtenerPoolConnection(): Promise<mysql.PoolConnection> {
    try {
      this.logger.log('Inicializando pool de conexión en la base de datos.');
      const conexion = await this.pool.getConnection();
      this.logger.log('Se inició el pool de conexión.');
      return conexion;
    } catch (error) {
      this.logger.log('No se pudo inicializar el pool de conexión hacia la base de datos.');
      this.logger.error(error);
      throw error;
    }
  }

  private escaping(params: Record<string, any>): Record<string, any> {
    const escapedParams: Record<string, any> = {};
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        escapedParams[key] = this.pool.escape(params[key]);
      }
    }
    return escapedParams;
  }

  prepareQuery(query: string, params: Record<string, any>): [string, any[]] {
    const preparedParams: any[] = [];
    const preparedQuery = query.replace(/:(\w+)/g, (match, key) => {
      if (params.hasOwnProperty(key)) {
        preparedParams.push(params[key]);
        return '?';
      }
      throw new Error(`Missing parameter: ${key}`);
    });
    return [preparedQuery, preparedParams];
  }

  async end(): Promise<void> {
    if (!this.isClosed) {
      await this.pool.end();
      this.isClosed = true;
    }
  }
}