import { Injectable, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "src/app/home/service/user/user.service";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  user: SocialUser;
  signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthService) {
    this.authService.loggedIn.subscribe((value) => {
      console.log("SIGNED IN ", value);
      this.signedIn.next(value);
      if (value === false) {
        this.router.navigate(["/auth"]);
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> {
    console.log("AUTH GUARD", route.toString());
    if (!this.signedIn.value && !route.url.toString().includes("auth"))
      this.router.navigate(["/auth"]);
    return true;
  }
}
