import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private authService: AuthService) {
    this.authService.loggedIn.subscribe((value) => {
      this.signedIn.next(value);
      if (value === false) {
        this.router.navigate(["/auth"]);
      }
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    if (!this.signedIn.value && !route.url.toString().includes("auth"))
      this.router.navigate(["/auth"]);
    return true;
  }
}
