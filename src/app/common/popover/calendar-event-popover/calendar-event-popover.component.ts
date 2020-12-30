import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EventService } from "src/app/events/service/event/event.service";

@Component({
  selector: "app-calendar-event-popover",
  templateUrl: "./calendar-event-popover.component.html",
  styleUrls: ["./calendar-event-popover.component.scss"],
})
export class CalendarEventPopoverComponent implements OnInit {
  @Input() dismissPopOver: Function;
  @Input() event: any;
  title: string;
  startDate: string;
  endDate: string;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.title = this.event!.title;
    this.startDate = this.event!.start;
    this.endDate = this.event!.end;
  }

  async editEvent() {
    console.log("EDIT", this.event.id);
    await this.dismissPopOver();
    await this.router.navigate(["/home/edit-event"], {
      state: { data: { eventId: this.event.id } },
    });
  }

  async deleteEvent() {
    await this.eventService.deleteEvent(this.event.id);
  }
}
