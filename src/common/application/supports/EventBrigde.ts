import { EventBridgeClient, PutEventsCommand } from "@aws-sdk/client-eventbridge";

const eventBridgeClient = new EventBridgeClient({ region: "us-east-2" });

export async function sendEventToEventBridge(
    detailType: string,
    source: string,
    detail: Record<string, any>,
    eventBusName: string
): Promise<void> {
    const params = {
        Entries: [
            {
                Detail: JSON.stringify(detail),
                DetailType: detailType,
                Source: source,
                EventBusName: eventBusName,
            },
        ],
    };

    try {
        await eventBridgeClient.send(new PutEventsCommand(params));
        console.log("Event sent to EventBridge");
    } catch (error) {
        console.error("Failed to send event to EventBridge:", error);
        throw error;
    }
}