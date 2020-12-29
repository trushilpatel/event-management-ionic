import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CreateEventPageRoutingModule } from "./create-event-routing.module";

import { CreateEventPage } from "./create-event.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateEventPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateEventPage],
})
export class CreateEventPageModule {}
