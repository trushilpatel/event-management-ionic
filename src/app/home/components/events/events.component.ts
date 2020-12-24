import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "../../service/event/event.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  title: string = "Events";
  events: Array<any>;

  constructor(private router: Router, private eventService: EventService) {
    this.eventService.calendarItems.subscribe((items) => {
      console.log("EVENT SUBSCRIBER");

      this.events = items;
    });
  }

  getEvents() {
    return this.events;
  }

  ngOnInit() {}

  async createEvent() {
    await this.router.navigate(["home", "create-event"]);
  }

  async deleteEvent(id: string) {
    await this.eventService.deleteEvent(id);
  }
}
