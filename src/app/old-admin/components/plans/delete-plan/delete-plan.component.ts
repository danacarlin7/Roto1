import {Component} from "@angular/core";
import {MdDialog, MdDialogRef} from "@angular/material";
import {MembershipPlan} from "../../../models/plan.model";
/**
 * Created by Hiren on 26-05-2017.
 */

@Component({
  selector: 'delete-plan-alert',
  templateUrl: 'delete-plan.component.html',
  styleUrls: ['./delete-plan.component.css']
})
export class DeletePlanAlert {

  plan:MembershipPlan;

  constructor(public dialogRef:MdDialogRef<DeletePlanAlert>) {
  }

  cancelBtnClicked() {
    this.dialogRef.close(false);
  }

  deleteBtnClicked() {
    this.dialogRef.close(true);
  }
}
