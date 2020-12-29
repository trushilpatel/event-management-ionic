import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { EventsComponent } from "./components/events/events.component";
import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "create-event",
    loadChildren: () =>
      import("../events/create-event/create-event.module").then(
        (m) => m.CreateEventPageModule
      ),
    pathMatch: "full",
  },
  {
    path: "edit-event",
    loadChildren: () =>
      import("../events/edit-event/edit-event.module").then(
        (m) => m.EditEventPageModule
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
      { path: "**", redirectTo: "calendar" },
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
