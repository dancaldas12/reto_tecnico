import { Injectable, Logger } from "@nestjs/common";
import { getInstanciaDynamo } from "./DynamoDB";
import { QueryCommand, PutItemCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { AppointmentRepository } from "../../domain/repository/AppointmentRepository";

@Injectable()
export class AppointmentDynamoDBRepository implements AppointmentRepository {
  private readonly logger = new Logger(AppointmentDynamoDBRepository.name);

  public async getAppointmentsRepository(insuredId: string): Promise<any> {
    this.logger.log(`Fetching appointments for insuredId: ${insuredId}`);
    const dynamoClient = getInstanciaDynamo();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      KeyConditionExpression: 'insuredId = :insuredId',
      ExpressionAttributeValues: {
        ':insuredId': { S: insuredId },
      },
    };
    const command = new QueryCommand(params);
    const result = await dynamoClient.send(command);
    return result.Items || [];
  }

  public async saveAppointment(insuredId: string, scheduleId: string, countryISO: string): Promise<void> {
    this.logger.log(`Saving appointment for insuredId: ${process.env.DYNAMODB_TABLE}`);
    const dynamoClient = getInstanciaDynamo();
    const command = new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        insuredId: { S: insuredId },
        scheduleId: { N: scheduleId.toString() },
        countryISO: { S: countryISO },
        status: { S: "pending" },
        createdAt: { S: new Date().toISOString() },
      }
    });
    await dynamoClient.send(command);
  }

  public async updateAppointmentRepository(insuredId: string): Promise<void> {
    this.logger.log(`Saving appointment for insuredId: ${process.env.DYNAMODB_TABLE}`);
    const dynamoClient = getInstanciaDynamo();
    const command = new PutItemCommand({
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        insuredId: { S: insuredId },
        // scheduleId: { N: scheduleId.toString() },
        // countryISO: { S: countryISO },
        status: { S: "complete" },
        // createdAt: { S: new Date().toISOString() },
      }
    });
    await dynamoClient.send(command);
  }

  /**
   * Actualiza el campo status de un registro específico en DynamoDB
   * @param insuredId clave primaria del registro
   * @param status nuevo valor para el campo status
   */
  public async updateStatus(insuredId: string, scheduleId: string): Promise<void> {
    this.logger.log(`Actualizando status para insuredId: ${insuredId}`);
    const dynamoClient = getInstanciaDynamo();
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        insuredId: { S: insuredId },
        scheduleId: { N: scheduleId.toString() }, // Asegúrate de que scheduleId sea parte de la clave primaria
      },
      UpdateExpression: 'SET #s = :status',
      ExpressionAttributeNames: {
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':status': { S: "complete" },
      },
    };
    const command = new UpdateItemCommand(params);
    await dynamoClient.send(command);
  }
}
