import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  profile: BehaviorSubject<object> = new BehaviorSubject<object>(null);

  constructor() {}

  setProfile(profile) {
    this.profile.next(profile);
  }
}
