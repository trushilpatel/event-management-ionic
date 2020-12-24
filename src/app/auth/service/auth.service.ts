import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { UserService } from "src/app/home/service/user.service";
import { AuthGuard } from "../guard/auth-guard";

declare var gapi: any;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  calendarItems: any[];
  googleAuth: any;

  constructor(private userService: UserService) {
    this.initClient();
  }

  async initClient() {
    gapi.load("client", async () => {
      console.log("Loading Client");
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

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    });

    this.calendarItems = events.result.items;
    console.log(this.calendarItems);
  }

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: "primary",
      start: {
        dateTime: "2020-12-25T17:06:00.000Z",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2020-12-25T18:00:00.000Z",
        timeZone: "America/Los_Angeles",
      },
      summary: "Have Fun!!!",
      description: "Wohoooo you did it",
    });
  }

  hoursFromNow(n) {
    return new Date(Date.now() + n * 1000 * 60 * 60).toString();
  }
}
