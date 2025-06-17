import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

export class SnsSupport {
    private client: any;
    constructor(){
        this.client = new SNSClient();
    }

    async publish(topicArn: string, message: string, attributes: any): Promise<void> {
        try {
            const params = {
                TopicArn: topicArn,
                Message: message,
                MessageAttributes: attributes
            };
            const command = new PublishCommand(params);
            return await this.client.send(command);
        } catch (error) {
            console.error("Error publishing message to SNS:", error);
            throw error;
        }
    }
}
