import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { EventService } from "src/app/events/service/event/event.service";

@Component({
  selector: "app-create-event",
  templateUrl: "./create-event.page.html",
  styleUrls: ["./create-event.page.scss"],
})
export class CreateEventPage {
  eventForm: FormGroup = new FormGroup({
    summary: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    startDate: new FormControl("", [Validators.required]),
    startTime: new FormControl("", [Validators.required]),
    endDate: new FormControl("", [Validators.required]),
    endTime: new FormControl("", [Validators.required]),
  });

  constructor(
    private toastController: ToastController,
    private eventService: EventService,
    private router: Router
  ) {
    console.log(this.router.getCurrentNavigation().extras.state?.data?.date);
    this.eventForm.patchValue({
      startDate: this.router.getCurrentNavigation().extras.state?.data?.date,
    });
  }

  async submit() {
    if (this.eventForm.invalid) {
      const toast = await this.toastController.create({
        message: "Please Enter Valid Details.",
        duration: 2000,
      });
      toast.present();
      return;
    }

    const data = this.eventForm.value;
    const event: CalendarEvent = {
      calendarId: "primary",
      summary: data.summary,
      description: data.description,
      start: {
        dateTime:
          data.startDate.substring(0, data.startDate.indexOf("T") + 1) +
          data.startTime.substring(data.startDate.indexOf("T") + 1),
      },
      end: {
        dateTime:
          data.endDate.substring(0, data.endDate.indexOf("T") + 1) +
          data.endTime.substring(data.endTime.indexOf("T") + 1),
      },
    };
    this.eventService.insertEvent(event);
    this.router.navigate(["/home/events"]);
  }
}
