import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {FrontService} from "../../services/front.service";

@Component({
  selector: "rp-plan-component",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"]
})
export class PlanComponent {
  plans;

  constructor(private router: Router, private frontService: FrontService) {
    this.plans = this.frontService.getDummyPlans();
  }

  onBtnSubscribeClick() {
    this.router.navigate(["/signup"]);
  }
}
