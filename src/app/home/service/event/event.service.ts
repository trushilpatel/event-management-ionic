import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

declare var gapi: any;

@Injectable({
  providedIn: "root",
})
export class EventService {
  calendarItems: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor() {
    this.getEvents();
  }

  async getEvents() {
    const events = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    });
    this.calendarItems.next(events.result.items);
  }

  async deleteEvent(id: string) {
    console.log("DELETE ", id);

    await gapi.client.calendar.events
      .delete({ calendarId: "primary", eventId: id })
      .execute();
    await this.getEvents;
  }

  async insertEvent(event: CreateEvent) {
    const result = await gapi.client.calendar.events.insert(event);
    await this.getEvents();
  }
}
