import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { EventsComponent } from "./components/events/events.component";
import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "create-event",
    loadChildren: () =>
      import("./page/events/create-event/create-event.module").then(
        (m) => m.CreateEventPageModule
      ),
    pathMatch: "full",
  },
  {
    path: "tabs",
    component: HomePage,
    children: [
      {
        path: "events",
        component: EventsComponent,
      },
      {
        path: "calendar",
        component: CalendarComponent,
      },
      { path: "**", redirectTo: "events" },
    ],
  },
  {
    path: "**",
    redirectTo: "tabs",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
