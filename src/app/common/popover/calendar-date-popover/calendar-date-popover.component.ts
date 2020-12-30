import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-calendar-date-popover",
  templateUrl: "./calendar-date-popover.component.html",
  styleUrls: ["./calendar-date-popover.component.scss"],
})
export class CalendarDatePopoverComponent {
  @Input() dismissPopOver: Function;
  @Input() calendarDate: any;

  constructor(private router: Router) {}

  createEvent() {
    this.dismissPopOver();
    this.router.navigate(["/home/create-event"], {
      state: { data: { date: this.calendarDate } },
    });
  }
}
