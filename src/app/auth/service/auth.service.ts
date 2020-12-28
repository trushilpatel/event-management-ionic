import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { UserService } from "src/app/home/service/user/user.service";
import { AuthGuard } from "../guard/auth-guard";

declare var gapi: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoadingFiles: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  calendarItems: any[];
  googleAuth: any;

  constructor(private userService: UserService, private router: Router) {
    this.initClient();
  }

  async initClient() {
    gapi.load("client", async () => {
      console.log("Loading Client");
      this.isLoadingFiles.next(true);
      await gapi.client.init({
        apiKey: "AIzaSyCuLdji7aiiELTg9bhuiR0yf7BLkOHzivw",
        clientId:
          "697350953849-mp1uaml9f9kd0a12n4dskfi1n4ckih0d.apps.googleusercontent.com",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar",
      });
      await gapi.client.load("calendar", "v3", () =>
        console.log("Loaded Calendar")
      );

      this.googleAuth = await gapi.auth2.getAuthInstance();

      if (await this.isSignedIn()) {
        this.router.navigate(["/home"]);
      }

      this.isLoadingFiles.next(false);
      console.log("LOADED CLIENT");
    });
  }

  async isSignedIn() {
    const signedIn = this.googleAuth?.isSignedIn.get();
    this.loggedIn.next(signedIn);
    if (signedIn) this.setUserProfile();
    return signedIn == false ? false : true;
  }

  async setUserProfile() {
    console.log("SETTING PROFILE");
    await this.userService.setProfile(await this.getBasicProfile());
  }

  async getBasicProfile() {
    const profile = await this.googleAuth.currentUser.get().getBasicProfile();
    return {
      id: profile.getId(),
      name: profile.getName(),
      image: profile.getImageUrl(),
      email: profile.getEmail(),
    };
  }

  async signIn() {
    let userSignedIn = await this.isSignedIn();
    if (!(await this.isSignedIn())) {
      const googleUser = await this.googleAuth.signIn();
      const token = googleUser.getAuthResponse().id_token;
      this.loggedIn.next(true);
    }
  }

  async signOut() {
    await this.googleAuth.signOut();
    this.loggedIn.next(false);
  }
}
