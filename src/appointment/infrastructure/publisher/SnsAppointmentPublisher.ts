import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import { Injectable, Logger } from "@nestjs/common";
import { AppointmentRequest } from "../../application/dto/AppointmentRequest";
import { AppointmentPublisherPort } from "../../domain/port/messaging/AppointmentPublisherPort";

@Injectable()
export class SnsAppointmentPublisher implements AppointmentPublisherPort {
  private readonly client = new SNSClient({});
  private readonly logger = new Logger(SnsAppointmentPublisher.name);

  async publishAppointment(appointment: AppointmentRequest): Promise<void> {
    const topicArn = process.env.SNS_TOPIC_ARN!;
    const message = JSON.stringify(appointment);

    try {
      await this.client.send(
        new PublishCommand({
          TopicArn: topicArn,
          Message: message,
          MessageAttributes: {
            countryISO: {
              DataType: 'String',
              StringValue: appointment.countryISO
            }
          }
        })
      );
      this.logger.log(`Message published to SNS for insuredId=${appointment.insuredId}`);
    } catch (error) {
      this.logger.error('Failed to publish appointment to SNS', error);
      throw error;
    }
  }
}
