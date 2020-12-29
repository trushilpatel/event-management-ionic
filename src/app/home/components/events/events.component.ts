import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { EventService } from "../../../events/service/event/event.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.scss"],
})
export class EventsComponent implements OnInit {
  title: string = "Events";
  events: Array<any>;

  constructor(
    private router: Router,
    private eventService: EventService,
    private loadingController: LoadingController
  ) {
    this.eventService.calendarItems.subscribe((items) => {
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

  async editEvent(id: string, event: Event) {
    console.log(id, event);
    this.router.navigate(["/home/edit-event"], {
      state: { data: { id, event } },
    });
  }
}
