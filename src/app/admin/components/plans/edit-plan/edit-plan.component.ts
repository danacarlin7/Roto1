import {Component, Input} from "@angular/core";
import {selector} from "rxjs/operator/multicast";
import {MembershipPlanService} from "../../../../admin/services/membership-plan.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {PlanTypeConstants, ExpirationTypeConstant, TimeRangeConstant, SpacificTime} from "../plan-constants";
import {MembershipPlan} from "../../../../admin/models/plan.model";
import {Router} from "@angular/router";
import * as moment from 'moment';

/**
 * Created by Hiren on 27-05-2017.
 */

@Component({
  selector: 'dfs-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.css']
})
export class EditPlanComponent {

  @Input() plan:MembershipPlan;
  editPlanForm:FormGroup;
  planTypes = PlanTypeConstants;
  expirationTypes = ExpirationTypeConstant;
  timeRangeConstant = TimeRangeConstant;
  spacificTime = SpacificTime;
  selectedPlanType:{id:number,value:string};
  selectedExpType:any;

  constructor(private membershipPlanService:MembershipPlanService, private router:Router) {

  }

  ngOnInit() {
    this.plan = this.membershipPlanService.editPlan;
    if (!this.plan) {
      this.router.navigate(['/admin/plans']);
      return;
    }
    console.log("Edit Plan => ", this.plan);
    this.selectedPlanType = this.plan.plan_type;
    this.editPlanForm = new FormGroup({
      planType: new FormControl(this.plan.plan_type),
      name: new FormControl(this.plan.name),
      category: new FormControl(this.plan.category),
      planAmount: new FormControl(this.plan.amount / 100),
      amountCurrency: new FormControl(this.plan.currency),
      planInterval: (this.plan.plan_type.id == this.planTypes.SUBSCRIPTION.id) ? new FormControl(this.plan.exp_value.count) : new FormControl(),
      intervalDuration: (this.plan.plan_type.id == this.planTypes.SUBSCRIPTION.id) ? new FormControl(this.plan.exp_value.value) : new FormControl(),
      trialPeriod: new FormControl(this.plan.trial_period_days),
      expType: new FormControl(this.getPlanExpType()),
      expSpecificDateValue: this.prepareExpSpecificDateValue(),
      expTimePeriodValue: this.prepareExpTimePeriodValue(),
      isActive: new FormControl(this.plan.is_active, Validators.required),
      isPublic: new FormControl(this.plan.is_public, Validators.required)
    });
    this.editPlanForm.valueChanges.subscribe(
      newValue => {
        this.selectedPlanType = newValue.planType;
        this.selectedExpType = newValue.expType;
      }
    )
  }

  onBtnCancelClicked() {
    this.router.navigate(['/admin/plans'])
  }

  onBtnUpdateClicked() {
    let planValue = this.editPlanForm.value;
    let newPlan:any;
    if (this.selectedPlanType.id == PlanTypeConstants.FREE.id) {
      newPlan = {
        plan_type: this.plan.plan_type,
        amount: 0,
        exp_type: planValue.expType,
        exp_value: this.generatePlanExpValue(),
        name: planValue.name,
        category: planValue.category,
        currency: 'usd',
        id: this.plan.plan_id,
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    } else if (this.selectedPlanType.id == PlanTypeConstants.SUBSCRIPTION.id) {
      newPlan = {
        plan_type: this.plan.plan_type,
        amount: planValue.planAmount,
        exp_value: this.plan.exp_value,
        trial_period_days: planValue.trialPeriod,
        name: planValue.name,
        category: planValue.category,
        currency: this.plan.currency,
        id: this.plan.plan_id,
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    } else if (this.selectedPlanType.id == PlanTypeConstants.ONE_TIME_CHARGE.id) {
      newPlan = {
        plan_type: this.plan.plan_type,
        amount: planValue.planAmount * 100,
        exp_type: planValue.expType,
        exp_value: this.generatePlanExpValue(),
        name: planValue.name,
        category: planValue.category,
        currency: planValue.amountCurrency,
        id: this.plan.plan_id,
        is_active: planValue.isActive,
        is_public: planValue.isPublic
      };
    }
    console.log("Plan => ", JSON.stringify(newPlan));
    this.updateMembershipPlan(newPlan);
  }

  updateMembershipPlan(plan:any) {
    this.membershipPlanService.updatePlan(plan, this.plan._id)
      .subscribe(response => {
        if (response.statusCode == 200) {
          console.log('edit response =>', response);
          this.router.navigate(['/admin/plans'])
        }
        else {

        }
      })
  }

  prepareExpSpecificDateValue():FormGroup {
    let expValue:FormGroup = new FormGroup({
      year: new FormControl(),
      month: new FormControl(),
      day: new FormControl(),
      hour: new FormControl(),
      minute: new FormControl()
    });
    if (this.plan.exp_type.id == this.expirationTypes.SPECIFIC_DATE.id) {
      let dateVal = moment.utc(this.plan.exp_value.specific_exp_date);
      dateVal.local();
      expValue = new FormGroup({});
      expValue.addControl('year', new FormControl(dateVal.year()));
      expValue.addControl('month', new FormControl(this.spacificTime.MONTHS[dateVal.month()].value));
      expValue.addControl('day', new FormControl(dateVal.day()));
      expValue.addControl('hour', new FormControl(dateVal.hour()));
      expValue.addControl('minute', new FormControl(dateVal.minute()));
    }
    console.log("expValue => ", expValue, "month =>",);
    return expValue;
  }

  prepareExpTimePeriodValue():FormGroup {
    let expValue:FormGroup = new FormGroup({
      count: new FormControl(),
      value: new FormControl()
    });
    if (this.plan.exp_type.id == this.expirationTypes.TIME_PERIOD.id) {
      expValue = new FormGroup({});
      expValue.addControl('count', new FormControl(this.plan.exp_value.count));
      expValue.addControl('value', new FormControl(this.plan.exp_value.value));
    }
    return expValue;
  }

  getPlanExpType():any {
    let expType:any;
    switch (this.plan.exp_type.id) {
      case this.expirationTypes.NONE.id:
        expType = this.expirationTypes.NONE;
        break;
      case this.expirationTypes.SPECIFIC_DATE.id:
        expType = this.expirationTypes.SPECIFIC_DATE;
        break;
      case this.expirationTypes.TIME_PERIOD.id:
        expType = this.expirationTypes.TIME_PERIOD;
        break;
    }
    this.selectedExpType = expType;
    return expType;
  }

  generatePlanExpValue():any {
    let expValue:any;
    if (this.selectedExpType == ExpirationTypeConstant.SPECIFIC_DATE) {
      let val = this.editPlanForm.value.expSpecificDateValue;
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
      let val = this.editPlanForm.value.expTimePeriodValue;
      expValue = {count: val.count, value: val.value};
    } else {
      expValue = {count: 1, value: "year"};
    }
    return expValue;
  }

}
