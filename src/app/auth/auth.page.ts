import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { environment } from "../../environments/environment";
import { AuthService } from "./service/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  private key: string = environment.GOOGLE_CLIENT_ID;

  constructor(
    // private authService: SocialAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async googleSignIn() {
    // const data = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    let data = await this.authService.signIn();
    this.router.navigate(["/"]);
  }
}
