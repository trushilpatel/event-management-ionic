import { Component, Output } from "@angular/core";
import { CalendarOptions } from "@fullcalendar/angular";
import { PopoverController } from "@ionic/angular";
import { EventEmitter } from "events";
import { CalendarDatePopoverComponent } from "src/app/common/popover/calendar-date-popover/calendar-date-popover.component";
import { CalendarEventPopoverComponent } from "src/app/common/popover/calendar-event-popover/calendar-event-popover.component";
import { EventService } from "src/app/events/service/event/event.service";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent {
  eventPopOver: any;
  calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
    height: "auto",
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [],
  };

  title: string = "Calendar";
  @Output() setTitle = new EventEmitter();

  constructor(
    private popoverController: PopoverController,
    private eventService: EventService
  ) {
    eventService.calendarEvents.subscribe((events: Array<any>) => {
      const calendarEvents = [];
      events.forEach((event) => {
        calendarEvents.push({
          id: event.id,
          title: event.summary,
          start: (event.start.dateTime as string).substring(
            0,
            event.start.dateTime.indexOf("T")
          ),
          end: event.end.dateTime,
        });
      });
      this.calendarOptions.events = calendarEvents;
    });
  }

  async handleDateClick(arg) {
    this.eventPopOver = await this.popoverController.create({
      component: CalendarDatePopoverComponent,
      event: arg.jsEvent,
      componentProps: {
        dismissPopOver: this.dismissPopOver.bind(this),
        calendarDate: arg!.dateStr,
      },
    });
    await this.eventPopOver.present();
  }

  async handleEventClick(arg) {
    this.eventPopOver = await this.popoverController.create({
      component: CalendarEventPopoverComponent,
      event: arg.jsEvent,
      componentProps: {
        event: arg!.event,
        dismissPopOver: this.dismissPopOver.bind(this),
      },
    });
    await this.eventPopOver.present();
  }

  dismissPopOver() {
    if (this.eventPopOver) this.eventPopOver.dismiss();
  }
}
