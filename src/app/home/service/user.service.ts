import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  profile: BehaviorSubject<object> = new BehaviorSubject<object>(null);

  constructor() {}

  setProfile(profile) {
    console.log("Setting Profile", profile);
    this.profile.next(profile);
  }
}
