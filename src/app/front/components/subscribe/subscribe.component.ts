import {
  Component,
  OnInit,
  ViewContainerRef,
  Compiler,
  Injector,
  TemplateRef,
  ViewChild,
  NgModuleRef
} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Overlay} from "angular2-modal";
import {overlayConfigFactory} from "angular2-modal";
import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
import "rxjs/Rx";
import {AuthService} from "../../../shared/services/auth.service";
import {FrontService} from "../../services/front.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: "app-subscribe",
  templateUrl: "./subscribe.component.html",
  styleUrls: ["./subscribe.component.css"]
})
export class SubscribeComponent implements OnInit {

  plans: Array<any> = [];
  selectedPlan;
  userData;
  params = {};
  coupon = "";
  userToken = "";
  email = "";
  isLoading: boolean;
  showPartialSignUpMsg: boolean;

  errorMsg: any;

  unsubscribeOption = "at_period_end";

  period_text = {week: "Weekly", month: "Monthly", year: "Yearly", annual: "Annually"};

  @ViewChild("unsubscribeTemplateRef") public unsubscribeTemplateRef: TemplateRef<any>;
  @ViewChild('couponTemplateRef') public couponTemplateRef:TemplateRef<any>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authService: AuthService,
              private frontService: FrontService,
              private injector: Injector,
              overlay: Overlay,
              vcRef: ViewContainerRef,
              public modal: Modal) {
    overlay.defaultViewContainer = vcRef;
    if (this.authService.isLoggedIn()) {
      this.userData = this.authService.retrieveLoggedUserInfo()
        .subscribe(
          response => {
            console.log("response from subscription in front-header.component");
            if (response.statusCode == 200) {
              this.userData = response.data;
              this.email = this.userData.email;
              this.authService.loggedUser = this.userData;
            }
          }
        );
    }
    if (this.authService.partialUser) {
      this.showPartialSignUpMsg = true;
      this.userToken = this.authService.partialUser.token;
      this.email = this.authService.partialUser.email;
      console.log(this.userToken);
    }
  }

  ngOnInit() {
    this.isLoading = true;
    this.frontService.getSubscribePlans().subscribe(
      response => {
        this.isLoading = false;
        if (this.authService.loggedUser) {
          if (this.authService.loggedUser.is_memberspace && this.authService.loggedUser.role != "user") {
            for (let i = 0; response.data && i < response.data.length; i++) {
              if (response.data[i].group == "all_access" || response.data[i].group == "dfsportsgods") {
                this.plans = this.plans.concat(response.data[i].data);
              }
            }
          } else if (this.authService.loggedUser.is_memberspace && this.authService.loggedUser.role == "user") {
            for (let i = 0; response.data && i < response.data.length; i++) {
              if (response.data[i].group == "dfsportsgods") {
                this.plans = this.plans.concat(response.data[i].data);
              }
            }
          } else if (!this.authService.loggedUser.is_memberspace && this.authService.loggedUser.role != "user") {
            for (let i = 0; response.data && i < response.data.length; i++) {
              console.log(response.data[i]);
              console.log(response.data.length);
              if (response.data[i].group == "all_access" || response.data[i].group == "rotopros") {
                this.plans = this.plans.concat(response.data[i].data);
              }
            }
          } else if (!this.authService.loggedUser.is_memberspace && this.authService.loggedUser.role == "user") {
            for (let i = 0; response.data && i < response.data.length; i++) {
              if (response.data[i].group === "rotopros") {
                this.plans = this.plans.concat(response.data[i].data);
              }
            }
          } else {
            for (let i = 0; response.data && i < response.data.length; i++) {
              if (response.data[i].group == "rotopros") {
                this.plans = this.plans.concat(response.data[i].data);
              }
            }
          }
        } else {
          for (let i = 0; response.data && i < response.data.length; i++) {
            if (response.data[i].group == "rotopros") {
              this.plans = this.plans.concat(response.data[i].data);
            }
          }
        }

        if (this.route.snapshot.params["id"]) {
          this.params = this.route.snapshot.params;
          this.coupon = this.route.snapshot.params["id"];
        }
      }
    );
  }

  couponClicked(plan) {
    this.selectedPlan = plan;
    this.modal.open(this.couponTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  checkCoupon(coupon, couponDialog , callback) {
    let that = this;
    console.log(coupon);
    if (this.authService.isLoggedIn() && coupon) {

      this.frontService.validateCouponAdvance(coupon)
        .subscribe(
          response => {
            if (response.statusCode === 200) {
                that.errorMsg = "";
                console.log("validateCouponAdvance Success => ", response.data);
                // couponDialog.close();
                callback(true, coupon);
            }
          },
          error => {
            console.log("http error => ", error);
            that.errorMsg  = error.data ? error.data : "Error"
            callback(false, error.data)
          }
        );
    } else if (coupon) {
      this.frontService.validateCoupon(coupon)
        .subscribe(
          response => {
            if (response.statusCode === 200) {
              that.errorMsg = "";
              console.log("validateCoupon Success => ", response.data);
              callback(true, coupon);
            }
          },
          error => {
            console.log("http error => ", error);
            that.errorMsg  = error.data ? error.data : "Error"
            callback(false, error.data)
          }
        );
    } else {
      callback(true,"empty");
    }
  }

  //
  // onBtnSubscribeClickOld(plan) {
  //   this.selectedPlan = plan;
  //   localStorage.setItem('selectedPlan', plan.plan_id);
  //   if (this.authService.isLoggedIn()) {
  //     var handler = (<any>window).StripeCheckout.configure({
  //       key: environment.production ?  'pk_live_ot2q3JGgPLEfvia8StJWO0b7' : 'pk_test_A5XmrDsft5PHHvkxOKISsUR7',
  //       locale: 'auto',
  //       token: (token: any) => {
  //         // You can access the token ID with `token.id`.
  //         // Get the token ID to your server-side code for use.
  //         console.log("token call back => ", token);
  //         this.frontService.subscribePlan(token.id, this.selectedPlan.plan_id, this.coupon)
  //           .subscribe(
  //             response => {
  //               if (response.statusCode == 200) {
  //                 console.log("subscribePlan Success => ", response.data);
  //
  //                 this.authService.retrieveLoggedUserInfo()
  //                 .subscribe(
  //                   response => {
  //                     if (response.statusCode == 200) this.authService.loggedUser = response.data;
  //                   },
  //                   error => {
  //                     console.log("http error => ", error);
  //                   }
  //                 );
  //
  //                 this.router.navigate([
  //                   '/homeRedirect',
  //                   { redirected: true, redirectMessage: "You Have Successfully Been Subscribed!" }]);
  //               }
  //             }
  //           );
  //       }
  //     });
  //
  //     handler.open({
  //       name: this.selectedPlan.name,
  //       description: this.selectedPlan.interval != 'day' ? this.period_text[this.selectedPlan.interval] : 'Every ' + this.selectedPlan.interval_count + ' days',
  //       amount: this.selectedPlan.amount,
  //       email: this.userData.email
  //     });
  //   } else {
  //     this.router.navigate(['/login'], {queryParams: {redirect: location.pathname}});
  //   }
  // }

  onBtnSubscribeClick(couponDialog , coupon) {
    // this.selectedPlan = plan;
    let that = this;
    console.log(coupon);
    this.checkCoupon(coupon, couponDialog, function(status, resp){
      console.log(that.userToken.length);
      if(status){
        couponDialog.close();
        localStorage.setItem("selectedPlan", that.selectedPlan.plan_id);
        if (that.authService.isLoggedIn() || that.userToken.length) {
          var handler = (<any>window).StripeCheckout.configure({
            key: environment.production ? "pk_live_ot2q3JGgPLEfvia8StJWO0b7" : "pk_test_A5XmrDsft5PHHvkxOKISsUR7",
            locale: "auto",
            token: (token: any) => {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              console.log("token call back => ", token);
              that.coupon = resp != "empty" && status ? resp : "";
              if(that.authService.isLoggedIn()){
                that.frontService.subscribePlan(token.id, that.selectedPlan.plan_id, that.coupon)
                  .subscribe(
                    response => {
                      if (response.statusCode == 200) {
                        console.log("subscribePlan Success => ", response.data);

                        that.authService.retrieveLoggedUserInfo()
                          .subscribe(
                            response => {
                              if (response.statusCode == 200) that.authService.loggedUser = response.data;
                            },
                            error => {
                              console.log("http error => ", error);
                            }
                          );

                        that.router.navigate([
                          "/homeRedirect",
                          {redirected: true, redirectMessage: "You Have been Successfully Subscribed!"}]);
                      }
                    }
                  );
              }else{
                console.log("i am here", that.coupon);
                that.frontService.signUpStepTwo(token.id, that.selectedPlan.plan_id, that.coupon)
                  .subscribe(
                    response => {
                      if (response.statusCode == 200) {
                        console.log("subscribePlan Success => ", response.data);

                        that.authService.retrieveLoggedUserInfo()
                          .subscribe(
                            response => {
                              if (response.statusCode == 200) that.authService.loggedUser = response.data;
                            },
                            error => {
                              console.log("http error => ", error);
                            }
                          );

                        that.router.navigate([
                          "/homeRedirect",
                          {redirected: true, redirectMessage: "You Have been Successfully Subscribed! We have sent you a verification mail to your registered email address."}]);
                      }
                    }
                  );
              }
            }
          });

          handler.open({
            name: that.selectedPlan.name,
            description: that.selectedPlan.interval != "day" ? that.period_text[that.selectedPlan.interval] : "Every " + that.selectedPlan.interval_count + " days",
            amount: that.selectedPlan.amount,
            email: that.email
          });
        } else {
          that.router.navigate(["/login"], {queryParams: {redirect: location.pathname}});
        }
      }
    })
  }

  onBtnUnsubscribeClick(plan) {
    this.unsubscribeOption = "at_period_end";
    this.modal.open(this.unsubscribeTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  endSubscription(subscribeDialog) {
    this.frontService.unsubscribePlan(1, this.unsubscribeOption == "at_period_end").subscribe(
      response => {
        subscribeDialog.close();
      }
    );
  }
}
