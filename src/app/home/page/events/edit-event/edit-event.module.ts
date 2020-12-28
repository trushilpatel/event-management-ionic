import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { EditEventPageRoutingModule } from "./edit-event-routing.module";

import { EditEventPage } from "./edit-event.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditEventPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EditEventPage],
})
export class EditEventPageModule {}
