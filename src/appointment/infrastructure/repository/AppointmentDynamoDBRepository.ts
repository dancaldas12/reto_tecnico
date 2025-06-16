import { Injectable, Logger } from "@nestjs/common";
import { getInstanciaDynamo } from "./DynamoDB";
import { QueryCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { AppointmentRepository } from "../../domain/repository/AppointmentRepository";

@Injectable()
export class AppointmentDynamoDBRepository implements AppointmentRepository {
  private readonly logger = new Logger(AppointmentDynamoDBRepository.name);

  public async getAppointmentsRepository(insuredId: string): Promise<any> {
    this.logger.log(`Fetching appointments for insuredId: ${insuredId}`);
    const dynamoClient = getInstanciaDynamo();
    const params = {
      TableName: process.env.APPOINTMENTS_TABLE_NAME,
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
    this.logger.log(`Saving appointment for insuredId: ${insuredId}`);
    const dynamoClient = getInstanciaDynamo();
    const command = new PutItemCommand({
      TableName: process.env.APPOINTMENTS_TABLE_NAME,
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
}
