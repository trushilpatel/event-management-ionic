import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthGuard } from "src/app/auth/guard/auth-guard";
import { AuthService } from "src/app/auth/service/auth.service";

@Component({
  selector: "app-popover",
  templateUrl: "./popover.component.html",
  styleUrls: ["./popover.component.scss"],
})
export class PopoverComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit() {}

  async signOut() {
    await this.authService.signOut();
    console.log("LOG OUT");
    this.router.navigate(["/"]);
  }
}
