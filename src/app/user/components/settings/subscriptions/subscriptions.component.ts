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
import { NgForm } from "@angular/forms";
// import { Subscription } from "rxjs";
// import {Overlay} from "angular2-modal";
// import {overlayConfigFactory} from "angular2-modal";
// import {Modal, BSModalContext} from "angular2-modal/plugins/bootstrap";
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import "rxjs/Rx";
import { AuthService } from "../../../../shared/new-services/auth.service";
import { LoggedUser } from "../../../../shared/models/logged-user.model";
// import {UserDashboardServices} from "../../../services/user-dashboard.service";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
/**
 * Created by Hiren on 27-07-2017.
 */

@Component({
  selector: "rp-subscriptions",
  templateUrl: "./subscriptions.component.html",
  styleUrls: ["./subscriptions.component.css"]
})
export class SubscriptionsComponent implements OnInit {
  userData: LoggedUser;
  user_name = "";
  unsubscribeOption = "at_period_end";
  selectedPlan;
  @ViewChild("unsubscribeTemplateRef") public unsubscribeTemplateRef: TemplateRef<any>;

  constructor(private authService: AuthService,
    private router: Router,
    overlay: Overlay,
    vcRef: ViewContainerRef,
    public modal: Modal,
    // private dashboardService: UserDashboardServices
  ) {
    this.userData = this.authService.loggedUser;
    this.authService.loggedUserChangeEvent.subscribe(user => {
      this.userData = user;
      this.user_name = this.userData.user_name;

      // overlay.defaultViewContainer = vcRef;
      // modal.overlay.defaultViewContainer = vcRef;
    });
    if (this.userData) {
      this.user_name = this.userData.user_name;

      // overlay.defaultViewContainer = vcRef;
      // modal.overlay.defaultViewContainer = vcRef;
    }
  }

  ngOnInit() {
    console.log(this.userData);
  }

  onBtnUnsubscribeClick(plan) {
    this.unsubscribeOption = "at_period_end";
    this.selectedPlan = plan;

    const dialogRef = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('End Subscription')
      .body(`
        <div class="row">
          <div class="col-xs-12">
            <div class="unsubscribeOption">
              <input type="radio" name="unsubscribeOption" value="immediate" [(ngModel)]="unsubscribeOption"/>
              <div class="info">
                <p><strong>Immediately</strong></p>
                <p class="text-muted">End the subscription immediately.</p>
              </div>
            </div>
            <div class="unsubscribeOption">
              <input type="radio" name="unsubscribeOption" value="at_period_end" [(ngModel)]="unsubscribeOption"/>
              <div class="info">
                <p><strong>At period end ({{ selectedPlan.current_period_end | date : 'medium' }})</strong></p>
                <p class="text-muted">End the subscription at the end of the current billing period.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" (click)="unsubscribeDialog.close(true)">Close</button>
          <button type="button" class="btn btn-primary" (click)="endSubscription(unsubscribeDialog)">End Subscription
          </button>
        </div>`)
      .open();
    // this.modal.open(this.unsubscribeTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  endSubscription(subscribeDialog) {
    // this.dashboardService.unsubscribePlan(this.selectedPlan.subscription_id, this.unsubscribeOption == "at_period_end").subscribe(
    //   response => {
    //     subscribeDialog.close();
    //     location.reload();
    //   }
    // );
  }
}
