import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import integrationPlugin from "@fullcalendar/interaction";
import { IonicModule } from "@ionic/angular";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { EventsComponent } from "./components/events/events.component";
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";

FullCalendarModule.registerPlugins([dayGridPlugin, integrationPlugin]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    FullCalendarModule,
  ],
  declarations: [HomePage, EventsComponent, CalendarComponent],
})
export class HomePageModule {}
