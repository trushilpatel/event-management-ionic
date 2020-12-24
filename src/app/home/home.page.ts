import { ThrowStmt } from "@angular/compiler";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PopoverController } from "@ionic/angular";
import { AuthService } from "../auth/service/auth.service";
import { PopoverComponent } from "../common/popover/popover.component";
import { UserService } from "./service/user.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  title: string;
  profile: any;

  constructor(
    private authService: AuthService,
    private popOverController: PopoverController,
    private router: Router,
    userService: UserService
  ) {
    userService.profile.subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile);
    });
  }

  async avatarClicked(event) {
    console.log("AVATAR");

    // const popover = await this.popOverController.create({
    //   component: PopoverComponent,
    //   event: event,
    //   translucent: true,
    // });

    // return await popover.present();
  }

  async signOut() {
    await this.authService.signOut();
    this.router.navigate(["/auth"]);
  }
}