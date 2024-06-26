import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

declare var gapi: any;

@Injectable({
  providedIn: "root",
})
export class EventService {
  calendarEvents: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

  constructor() {
    this.getEvents();
  }

  getEventFromId(id: string) {
    return this.calendarEvents.value.find((event) => event.id === id);
  }

  async getEvents() {
    const events = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    });
    this.calendarEvents.next(events.result.items);
  }

  async deleteEvent(id: string) {
    await gapi.client.calendar.events
      .delete({ calendarId: "primary", eventId: id })
      .execute();
    await this.getEvents;
  }

  async insertEvent(event: CalendarEvent) {
    const result = await gapi.client.calendar.events.insert(event);
    await this.getEvents();
  }

  async editEvent(id: string, event: CalendarEvent) {
    await gapi.client.calendar.events
      .update({
        calendarId: "primary",
        eventId: id,
        resource: event,
      })
      .execute();
    await this.getEvents();
  }
}
