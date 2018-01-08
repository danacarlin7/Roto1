import {Component} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {PlanTypeConstants, ExpirationTypeConstant, TimeRangeConstant, SpacificTime} from "../plan-constants";
import {Router} from "@angular/router";
import {MembershipPlan} from "../../../models/plan.model";
import * as moment from 'moment';
import {MembershipPlanService} from "../../../services/membership-plan.service";
/**
 * Created by Hiren on 25-05-2017.
 */

@Component({
  selector: 'dfs-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css']
})
export class AddPlanComponent {

  addPlanForm:FormGroup;
  planTypes = PlanTypeConstants;
  expirationTypes = ExpirationTypeConstant;
  timeRangeConstant = TimeRangeConstant;
  spacificTime = SpacificTime;
  selectedPlanType:{id:number,value:string};
  selectedExpType:any;
  errorMsg:string = "";

  constructor(private router:Router, private membershipPlanService:MembershipPlanService) {
    this.addPlanForm = new FormGroup({
      planType: new FormControl(),
      name: new FormControl(),
      category: new FormControl(),
      planAmount: new FormControl(),
      amountCurrency: new FormControl(),
      planInterval: new FormControl(),
      intervalDuration: new FormControl(),
      trialPeriod: new FormControl(),
      expType: new FormControl(),
      expSpecificDateValue: new FormGroup({
        year: new FormControl(),
        month: new FormControl(),
        day: new FormControl(),
        hour: new FormControl(),
        minute: new FormControl()
      }),
      expTimePeriodValue: new FormGroup({
        count: new FormControl(),
        value: new FormControl()
      }),
      isActive: new FormControl(false, Validators.required),
      isPublic: new FormControl(false, Validators.required)
    });
    this.addPlanForm.valueChanges.subscribe(
      newValue => {
        this.selectedPlanType = newValue.planType;
        this.selectedExpType = newValue.expType;
      }
    )
  }

  onBtnCancelClicked() {
    this.router.navigate(['/admin/plans'])
  }

  onBtnAddClicked() {
    let planValue = this.addPlanForm.value;
    let plan:any;
    if (this.selectedPlanType == PlanTypeConstants.FREE) {
      plan = {
        plan_type: planValue.planType,
        amount: 0,
        exp_type: planValue.expType,
        exp_value: this.generatePlanExpValue(),
        name: planValue.name,
        category: planValue.category,
        currency: 'usd',
        id: this.preparePlanId(planValue.name),
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    } else if (this.selectedPlanType == PlanTypeConstants.SUBSCRIPTION) {
      plan = {
        plan_type: planValue.planType,
        amount: planValue.planAmount * 100,
        exp_value: {count: planValue.planInterval, value: planValue.intervalDuration},
        trial_period_days: planValue.trialPeriod,
        name: planValue.name,
        category: planValue.category,
        currency: planValue.amountCurrency,
        id: this.preparePlanId(planValue.name),
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    } else if (this.selectedPlanType == PlanTypeConstants.ONE_TIME_CHARGE) {
      plan = {
        plan_type: planValue.planType,
        amount: planValue.planAmount * 100,
        exp_type: planValue.expType,
        exp_value: this.generatePlanExpValue(),
        name: planValue.name,
        category: planValue.category,
        currency: planValue.amountCurrency,
        id: this.preparePlanId(planValue.name),
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    }
    console.log("Plan => ", JSON.stringify(plan));
    this.errorMsg = "";
    this.addMembershipPlan(plan);
  }

  addMembershipPlan(plan:any) {
    this.membershipPlanService.addMembershipPlan(plan)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log("response => ", response);
            this.router.navigate(['/admin/plans'])
          }
          else {
            this.errorMsg = response.message;
          }
        },
        error => {
          this.errorMsg = error.message;
        }
      )
  }

  preparePlanId(value:string):string {
    let id:string = "";
    let tempArr = value.trim().split(' ');
    id = tempArr.join('-');
    return id;
  }

  generatePlanExpValue():any {
    let expValue:any;
    if (this.selectedExpType == ExpirationTypeConstant.SPECIFIC_DATE) {
      let val = this.addPlanForm.value.expSpecificDateValue;
      let expDate = moment({
        year: val.year,
        month: val.month,
        day: val.day,
        hour: val.hour,
        minute: val.minute,
        second: 0,
        millisecond: 0
      }).utc();
      expValue = {count: 1, value: 'year', specific_exp_date: expDate};
    } else if (this.selectedExpType == ExpirationTypeConstant.TIME_PERIOD) {
      let val = this.addPlanForm.value.expTimePeriodValue;
      expValue = {count: val.count, value: val.value};
    } else {
      expValue = {count: 1, value: "year"};
    }
    return expValue;
  }

}
