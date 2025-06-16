import { SQSEvent, SQSHandler } from 'aws-lambda';
import { createConnection } from 'mysql2/promise';
import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';

const eventBridge = new EventBridgeClient({});

export const handler: SQSHandler = async (event: SQSEvent): Promise<void> => {
  const records = event.Records;

  for (const record of records) {
    const body = JSON.parse(record.body);

    console.log('Processing appointment:', body);

    const connection = await createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });

    try {
      const { insuredId, scheduleId, countryISO } = body;

      await connection.execute(
        'INSERT INTO appointments (insured_id, schedule_id, country_iso, status, created_at) VALUES (?, ?, ?, ?, NOW())',
        [insuredId, scheduleId, countryISO, 'pending']
      );

      console.log(`Appointment inserted for ${insuredId}`);

      await eventBridge.send(
        new PutEventsCommand({
          Entries: [
            {
              Source: 'appointments.service',
              DetailType: 'appointment.created',
              Detail: JSON.stringify({ insuredId, scheduleId, countryISO }),
              EventBusName: 'default'
            }
          ]
        })
      );

      console.log(`EventBridge event emitted for ${insuredId}`);
    } catch (error) {
      console.error('Error inserting appointment or sending event:', error);
    } finally {
      await connection.end();
    }
  }
};
