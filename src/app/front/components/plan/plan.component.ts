import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FrontService} from "../../services/front.service";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: "rp-plan-component",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"]
})
export class PlanComponent {
  plans;

  isLogin: boolean;

  constructor(private router: Router, private frontService: FrontService, private authService: AuthService) {
    this.plans = this.frontService.getDummyPlans();
    this.isLogin = this.authService.isLoggedIn();
  }

  onBtnSubscribeClick() {
    this.router.navigate(["/signup"]);
  }
}
