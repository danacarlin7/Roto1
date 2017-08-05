import {
  Component,
  OnInit,
  ViewContainerRef,
  Compiler,
  Injector,
  TemplateRef,
  ViewChild,
  NgModuleRef
} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {Overlay} from 'angular2-modal';
import {overlayConfigFactory} from "angular2-modal";
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import 'rxjs/Rx';
import {CustomAuthService} from "../../../shared/services/auth.service";
import {FrontService} from "../../services/front.service";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  plans:Array<any> = [];
  selectedPlan;
  userData;

  isLoading:boolean;

  unsubscribeOption = "at_period_end";

  period_text = {week: 'Weekly', month: 'Monthly', year: 'Yearly', annual: 'Annually'};

  @ViewChild('unsubscribeTemplateRef') public unsubscribeTemplateRef:TemplateRef<any>;

  constructor(private router:Router, private authService:CustomAuthService, private frontService:FrontService, private injector:Injector, overlay:Overlay, vcRef:ViewContainerRef, public modal:Modal) {
    overlay.defaultViewContainer = vcRef;
    if (this.authService.isLoggedIn()) {
      this.userData = this.authService.retrieveLoggedUserInfo()
        .subscribe(
          response => {
            if (response.statusCode == 200) {
              this.userData = response.data;
              this.authService.loggedUser = this.userData;
            }
          }
        );
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.frontService.getSubscribePlans().subscribe(
      response => {
        this.isLoading = false;
        this.plans = response.data[0].data;
      }
    );
  }

  onBtnSubscribeClick(plan) {
    this.selectedPlan = plan;
    localStorage.setItem('selectedPlan', plan.plan_id);
    if (this.authService.isLoggedIn()) {
      var handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_A5XmrDsft5PHHvkxOKISsUR7',
        locale: 'auto',
        token: (token:any) => {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log("token call back => ", token);
          this.frontService.subscribePlan(token.id, this.selectedPlan.plan_id)
            .subscribe(
              response => {
                if (response.statusCode == 200) {
                  console.log("subscribePlan Success => ", response.data);
                }
              }
            );
        }
      });

      handler.open({
        name: this.selectedPlan.name,
        description: this.selectedPlan.interval != 'day' ? this.period_text[this.selectedPlan.interval] : 'Every ' + this.selectedPlan.interval_count + ' days',
        amount: this.selectedPlan.amount,
        email: this.userData.email
      });
    } else {
      this.router.navigate(['/login'], {queryParams: {redirect: location.pathname}});
    }
  }

  onBtnUnsubscribeClick(plan) {
    this.unsubscribeOption = "at_period_end";
    this.modal.open(this.unsubscribeTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  endSubscription(subscribeDialog) {
    this.frontService.unsubscribePlan(1, this.unsubscribeOption == 'at_period_end').subscribe(
      response => {
        subscribeDialog.close();
      }
    );
  }
}
