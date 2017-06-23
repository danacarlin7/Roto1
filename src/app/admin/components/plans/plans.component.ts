import {Component} from "@angular/core";
import {MdDialog} from "@angular/material";
import {DeletePlanAlert} from "./delete-plan/delete-plan.component";
import {Router} from "@angular/router";
import {MembershipPlan} from "../../models/plan.model";
import {MembershipPlanService} from "../../services/membership-plan.service";
/**
 * Created by Hiren on 24-05-2017.
 */


@Component({
  selector: 'dfs-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent {

  isLoading:boolean;

  plans:MembershipPlan[];

  constructor(private membershipService:MembershipPlanService, public dialog:MdDialog, private router:Router) {

  }

  ngOnInit() {
    this.retrieveMembershipPlans();
  }

  retrieveMembershipPlans() {
    this.isLoading = true;
    this.membershipService.retrieveMembershipPlans()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.plans = (response.data as MembershipPlan[]).filter(currPlan => !currPlan.livemode);
            this.isLoading = false;
          }
          else {

          }
        }
      )
  }

  deletePlanEventHandler(plan:MembershipPlan) {
    let dialogRef = this.dialog.open(DeletePlanAlert);
    dialogRef.componentInstance.plan = plan;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.membershipService.removePlanHandler(plan._id)
          .subscribe(
            response => {
              console.log("Plan deleted => ", plan);
              this.plans.splice(this.plans.indexOf(plan), 1);
            }
          )
      }
    });
  }

  editPlanEventHandler(plan:MembershipPlan) {
    this.membershipService.editPlan = plan;
    this.router.navigate(['/admin/plans/edit']);
  }

}
