import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let dynamoInstance: DynamoDBDocumentClient | null = null;

export function getInstanciaDynamo(): DynamoDBDocumentClient {
  if (!dynamoInstance) {
    const client = new DynamoDBClient({
      region: 'us-east-1',
    });
    dynamoInstance = DynamoDBDocumentClient.from(client);
  }
  return dynamoInstance;
}