import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  Output,
} from "@angular/core";
import { EventEmitter } from "events";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements AfterViewChecked {
  title: string = "Calendar";
  @Output() setTitle = new EventEmitter();

  constructor() {
    this.emitSetTitle();
  }

  ngAfterViewChecked() {}

  emitSetTitle() {
    console.log(this.setTitle.emit(this.title));
    console.log(this.title);
  }
}
