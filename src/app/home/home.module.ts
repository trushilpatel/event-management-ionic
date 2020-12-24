import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { EventsComponent } from "./components/events/events.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { PopoverComponent } from "../common/popover/popover.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    EventsComponent,
    CalendarComponent,
    PopoverComponent,
  ],
})
export class HomePageModule {}
