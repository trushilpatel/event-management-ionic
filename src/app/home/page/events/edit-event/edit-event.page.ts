import { Route } from "@angular/compiler/src/core";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, RouterStateSnapshot } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { EventService } from "src/app/home/service/event/event.service";

@Component({
  selector: "app-edit-event",
  templateUrl: "./edit-event.page.html",
  styleUrls: ["./edit-event.page.scss"],
})
export class EditEventPage implements OnInit {
  id: string;

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
    const data = this.router.getCurrentNavigation().extras.state.data;
    this.id = data!.id;
    console.log(data);

    this.eventForm.patchValue({
      summary: data!.event!.summary,
      description: data!.event!.description,
      startDate: data!.event!.start!.dateTime,
      startTime: data!.event!.start!.dateTime,
      endDate: data!.event!.end!.dateTime,
      endTime: data!.event!.end!.dateTime,
    });
  }

  ngOnInit() {}

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
    await this.eventService.editEvent(this.id, event);
    this.router.navigate(["/home/events"]);
  }
}
