import { Component, Output } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/angular";
import { EventEmitter } from "events";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    dateClick: this.handleDateClick.bind(this),
  };

  title: string = "Calendar";
  @Output() setTitle = new EventEmitter();

  constructor() {}

  handleDateClick(arg) {
    console.log(arg);
  }
}
