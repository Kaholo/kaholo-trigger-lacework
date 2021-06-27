# kaholo-trigger-lacework
Kaholo integration with Lacework
This is a basic trigger which listens to Laecework events using a webhook.

## How to use:
After installing the trigger on Kaholo, follow the steps described [here](https://support.lacework.com/hc/en-us/articles/360034367393-Webhook) to create a new Lacework alert channel and connect it to the webhook.

## Lacework Alert
This triggers whenever there is a lacework alert.

### Webhook URL:
**{KAHOLO_URL}/webhook/lacework/alert**

### Parameters:
1) Event type - If specified, only trigger when the alert matches the event type provided. If not specified, accept any event type.
2) Event ID - If specified, only trigger when the alert is from the specific event with the event ID provided. 
    If not specified, accept any event ID.
3) Event Severity - If specified, only trigger when the alert matches the severity level specified (1-5).
    If not specified, accept any event severity.