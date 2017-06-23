import {Component, Input, Output, EventEmitter} from "@angular/core";
import {MembershipPlan} from "../../../../admin/models/plan.model";
/**
 * Created by Hiren on 24-05-2017.
 */

@Component({
  selector: 'dfs-single-plan',
  templateUrl: './single-plan.component.html',
  styleUrls: ['./single-plan.component.css']
})
export class SinglePlanComponent {

  @Input() plan:MembershipPlan;
  @Output() deletePlan:EventEmitter<MembershipPlan> = new EventEmitter<MembershipPlan>();
  @Output() editPlan:EventEmitter<MembershipPlan> = new EventEmitter<MembershipPlan>();
  showActionIcons:boolean;

  constructor() {

  }

  onPlanMouseOver(e:MouseEvent) {
    this.showActionIcons = true;
  }

  onPlanMouseOut(e:MouseEvent) {
    this.showActionIcons = false;
  }

  onDeleteBtnClicked() {
    this.deletePlan.emit(this.plan);
  }

  onEditBtnClicked() {
    this.editPlan.emit(this.plan);
  }

}
