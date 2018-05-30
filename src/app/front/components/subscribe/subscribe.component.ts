/* core */
import {
  Component,
  OnInit,
  ViewContainerRef,
  Compiler,
  Injector,
  TemplateRef,
  ViewChild,
  NgModuleRef,
  Inject
} from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";

/* libs */
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subscription } from "rxjs";
// import { Overlay } from 'ngx-modialog';
// import { Modal } from 'ngx-modialog/plugins/bootstrap';


/* services */
import { AuthService } from "../../../shared/new-services/auth.service";
import { FrontService } from "../../new-services/front.service";

/* env */
import { environment } from "../../../../environments/environment";

/* variables */
declare var jQuery: any;

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

  isError: boolean;
  errorMsg: any;

  unsubscribeOption = "at_period_end";

  period_text = { week: "Weekly", month: "Monthly", year: "Yearly", annual: "Annually" };

  // @ViewChild("unsubscribeTemplateRef") public unsubscribeTemplateRef: TemplateRef<any>;
  // @ViewChild("couponTemplateRef") public couponTemplateRef: TemplateRef<any>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private frontService: FrontService,
    private injector: Injector,
    // overlay: Overlay,
    // vcRef: ViewContainerRef,
    // public modal: Modal,
    public dialog: MatDialog) {

    // console.log($("rotohead"));

    // overlay.defaultViewContainer = vcRef;
    // modal.overlay.defaultViewContainer = vcRef;
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

      // that.addPixelEvent('InitiateCheckout', that.selectedPlan);

      // FB Pixel : Lead
      let script = document.createElement("script");
      script.innerHTML = `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window,document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      fbq('track', 'Lead', {
        content_name: '` + this.authService.partialUser.email + `',
        content_category: 'Lead',
      });`;

      document.head.appendChild(script);

      let noscript = document.createElement("noscript");
      noscript.innerHTML = `<img height="1" width="1"
           src="https://www.facebook.com/tr?id=863624127129002&ev=Lead&noscript=1"/>`;
      document.head.appendChild(noscript);

    }
  }


  animal: string;
  name: string;


  couponClicked(plan) {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      height: '250px',
      data: plan
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
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
  //
  // couponClicked(plan) {
  //   if (this.authService.isLoggedIn() || this.authService.partialUser) {
  //     this.selectedPlan = plan;
  //     // this.modal.open(this.couponTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  //
  //     const dialogRef = this.modal.alert()
  //       .size('lg')
  //       .showClose(true)
  //       .title('Enter Your Coupon')
  //       .body(`
  //         <ng-template #content let-c="close" let-d="dismiss">
  //             <form class="form-horizontal" id="signup" novalidate (ngSubmit)="onBtnSubscribeClick()">
  //
  //
  //               <div class="alert alert-warning fade in" *ngIf="coupon.errorMsg">
  //                 {{ coupon.errorMsg }}
  //               </div>
  //
  //               <div class="form-group">
  //                 <label class="srOnly">Coupon Code</label>
  //                 <input placeholder="Code"
  //                        class="form-control" type="text" name="code"  [(ngModel)]="coupon.code" style="height: 36px;">
  //               </div>
  //
  //               <div class="form-group m-b-0 m-l-30">
  //                 <div class="offset-sm-1 col-sm-11">
  //                   <button type="submit" class="btn btn-info waves-effect waves-light m-t-10 m-r-20">Apply</button>
  //                 </div>
  //               </div>
  //             </form>
  //         </ng-template> `)
  //       .open();
  //
  //   } else {
  //     this.router.navigate(["/signup"], { queryParams: { redirect: location.pathname } });
  //   }
  // }




  // onBtnUnsubscribeClick(plan) {
  //   this.unsubscribeOption = "at_period_end";
  //   // this.modal.open(this.unsubscribeTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  //   const dialogRef = this.modal.alert()
  //     .size('lg')
  //     .showClose(true)
  //     .title('Enter Your Coupon')
  //     .body(`
  //           <div class="alert alert-danger fade in" *ngIf="errorMsg" style="padding: 10px;text-align: center;margin: 15px 20px;">
  //             {{errorMsg }}
  //           </div>
  //           <div class="form-group form-group col-xs-4 col-xs-offset-4">
  //             <label class="srOnly">Coupon Code</label>
  //             <input type="text"
  //                    class="col-xs-12"
  //                    name="cId"
  //                    placeholder="Code"
  //                    #couponCode style="height: 36px;">
  //           </div>
  //           <button type="button" class="btn btn-primary" (click)="onBtnSubscribeClick(couponDialog, couponCode.value);"><span
  //             area-hidden="true"></span> Apply
  //           </button>
  //           <button type="button" class="btn btn-default" (click)="onBtnSubscribeClick(couponDialog, false);">Skip</button>`)
  //     .open();
  // }

  endSubscription(subscribeDialog) {
    this.frontService.unsubscribePlan(1, this.unsubscribeOption == "at_period_end").subscribe(
      response => {
        subscribeDialog.close();
      }
    );
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  plans: Array<any> = [];
  selectedPlan;
  userData;
  params = {};
  coupon = "";
  userToken = "";
  email = "";
  isLoading: boolean;
  showPartialSignUpMsg: boolean;

  isError: boolean;
  datas = { errorMsg: ""};
  unsubscribeOption = "at_period_end";

  period_text = { week: "Weekly", month: "Monthly", year: "Yearly", annual: "Annually" };

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private frontService: FrontService,
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  checkCoupon(coupon, amount, callback) {
    let that = this;
    console.log(coupon);
    if (this.authService.isLoggedIn() && coupon) {

      this.frontService.validateCouponAdvance(coupon, amount)
        .subscribe(
        response => {
          if (response.statusCode === 200) {
            that.datas.errorMsg = "";
            console.log("validateCouponAdvance Success => ", response.data);
            // couponDialog.close();
            callback(true, coupon, response.data.amount);
          }
        },
        error => {
          console.log("http error => ", error);
          that.datas.errorMsg = error.data ? error.data : "Error";
          callback(false, error.data, false)
        });
    } else if (coupon) {
      this.frontService.validateCoupon(coupon, amount)
        .subscribe(
        response => {
          if (response.statusCode === 200) {
            that.datas.errorMsg = "";
            console.log("validateCoupon Success => ", response.data);
            callback(true, coupon, response.data.amount);
          }
        },
        error => {
          console.log("http error => ", error);
          that.datas.errorMsg = error.data ? error.data : "Error";
          callback(false, error.data, false)
        });
    } else {
      callback(true, "empty", amount);
    }
  }

  addPixelEvent(eventName, data) {
    console.log("adding pixel event " + eventName);

    let script = document.createElement("script");
    script.innerHTML = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js')
      fbq('track', '` + eventName + `', {
        content_ids: ['` + data.plan_id + `'],
        content_name: '` + data.name + `',
        content_category: 'Subscription',
        content_type: 'product',
        value: ` + data.amount + `,
        currency: 'USD'
      });`;
    console.log(script);
    document.head.appendChild(script);


    let noscript = document.createElement("noscript");
    noscript.innerHTML = `<img height="1" width="1"
         src="https://www.facebook.com/tr?id=863624127129002&ev=` + eventName + `&noscript=1"/>`;
    document.head.appendChild(noscript);
  }

  onBtnSubscribeClick(coupon) {
    // this.selectedPlan = plan;
    console.log(coupon);
    this.checkCoupon(coupon, this.data.amount, (status, resp, finalAmount) => {
      console.log(this.userToken.length, finalAmount);
      if (status) {
        // couponDialog.close();
        localStorage.setItem("selectedPlan", this.data.plan_id);
        if (this.authService.isLoggedIn() || this.userToken.length) {
          let handler = (<any>window).StripeCheckout.configure({
            key: environment.production ? "pk_live_ot2q3JGgPLEfvia8StJWO0b7" : "pk_test_A5XmrDsft5PHHvkxOKISsUR7",
            locale: "auto",
            token: (token: any) => {
              // You can access the token ID with `token.id`.
              // Get the token ID to your server-side code for use.
              console.log("token call back => ", token);
              this.coupon = resp != "empty" && status ? resp : "";
              if (this.authService.isLoggedIn()) {
                console.log("i am here", this.coupon);
                this.frontService.subscribePlan(token.id, this.data.plan_id, this.coupon).subscribe(
                  response => {
                    if (response.statusCode == 200) {
                      console.log("subscribePlan Success => ", response.data);

                      this.authService.retrieveLoggedUserInfo()
                        .subscribe(
                        response => {
                          if (response.statusCode == 200) this.authService.loggedUser = response.data;
                        },
                        error => {
                          console.log("http error => ", error);
                        }
                        );

                      this.router.navigate(["/homeRedirect",{ redirected: true, redirectMessage: "You Have been Successfully Subscribed!" }]);
                    }
                    this.authService.partialUser = null;
                  },
                  error => {
                    this.isError = true;
                    this.datas.errorMsg = "You have already subscribed to this plan";
                    jQuery("html, body").animate({ scrollTop: 0 });
                  });
              } else {
                console.log("i am here", this.coupon);
                this.frontService.signUpStepTwo(token.id, this.data.plan_id, this.coupon)
                  .subscribe(
                  response => {
                    if (response.statusCode == 200) {
                      console.log("subscribePlan Success => ", response.data);

                      this.authService.retrieveLoggedUserInfo()
                        .subscribe(
                        response => {
                          if (response.statusCode == 200)
                          this.authService.loggedUser = response.data;
                        },
                        error => {
                          console.log("http error => ", error);
                      });

                      this.router.navigate(["/homeRedirect",
                        {
                          redirected: true,
                          redirectMessage: "You Have been Successfully Subscribed! We have sent you a verification mail to your registered email address."
                        }]);
                    }
                  });
              }
            }
          });

          handler.open({
            name: this.selectedPlan.name,
            description: resp != "empty" && status ? "Your Coupon Code Has Been Applied" : this.selectedPlan.interval != "day" ? this.period_text[this.selectedPlan.interval] : "Every " + this.selectedPlan.interval_count + " days",
            amount: finalAmount,
            email: this.email
            // panelLabel: status ? "Amount After Discount" : "Pay"
            // image: "http://13.57.84.196/assets/images/logo.png"
          });

        }

        else {
          setTimeout(
            () => {
              this.router.navigate(["/login"], {queryParams: {redirect: location.pathname}});
            }, 100)
        }
      }
    })
  }


}
