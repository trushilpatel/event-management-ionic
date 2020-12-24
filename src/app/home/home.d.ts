interface CreateEvent {
  calendarId: string;
  start: {
    dateTime: string;
    timeZone?: string; //"America/Los_Angeles";
  };
  end: {
    dateTime: string; //"2020-12-25T18:00:00.000Z"
    timeZone?: string; //"America/Los_Angeles";
  };
  summary: string; //"Have Fun!!!";
  description: string; //"Wohoooo you did it";
}
