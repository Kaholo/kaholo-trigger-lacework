const translateTextMap = {"Any": "any", "Info": 5, "Low": 4,
                      "Medium": 3, "High": 2, "Critical": 1,
                      "5": 5, "4": 4, "3": 3, "2": 2, "1": 1};
const translateNumMap = {0: "", 1: "- Critical", 2: "- High Severity", 3: "- Medium Severity", 4: "- Low Severity", 5: "- Info"};

async function alertWebhook(req, res, settings, triggerControllers) {
  const body = req.body;
  try {
    const reqEType = body.event_type; // Get event type
    const reqEDescription = body.event_description; // Get event ID
    const reqESeverity = body.event_severity; // Get event severity
    const reqETitle = body.event_title; // Get event severity
    const recId = body.rec_id; // Get event severity
    if (!reqEType || !reqEDescription || !reqESeverity){
      res.status(400).send("bad lacework alert format");
      console.error("bad lacework alert format");
    }
    triggerControllers.forEach(trigger => {
      let {eventType, id, eventSeverity, includeHigherSev} = trigger.params;
      if (typeof(eventSeverity) === "string"){
        eventSeverity = translateTextMap[eventSeverity] || "any";
        if (eventSeverity === "any") {
          includeHigherSev = true, eventSeverity = 5;
        }
      }
      eventType = eventType || "Any";

      if (eventType !== "Any" && reqEType !== eventType) return;
      if (reqESeverity > eventSeverity) return;
      if (!includeHigherSev && reqESeverity !== eventSeverity) return;
      if (id && recId !== id) return;

      const msg = `${reqETitle} ${translateNumMap[reqESeverity]}`;
      trigger.execute(msg, body);
    });
    res.status(200).send("OK");
  }
  catch (err){
    res.status(422).send(err.message);
  }
}

module.exports = { alertWebhook }
