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
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Overlay} from 'angular2-modal';
import {overlayConfigFactory} from "angular2-modal";
import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import 'rxjs/Rx';
import {AuthService} from "../../../shared/services/auth.service";
import {LoggedUser} from "../../../shared/models/logged-user.model";
import {UserDashboardServices} from "../../services/user-dashboard.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tabs = [
    {
      id: 'profile',
      name: 'Your Profile'
    },
    {
      id: 'password',
      name: 'Change Password'
    },
    {
      id: 'subscribe',
      name: 'Subscribe Plan'
    }
  ];

  activeTab = null;

  userData:LoggedUser;
  user_name = '';
  unsubscribeOption = "at_period_end";

  selectedPlan;

  @ViewChild('unsubscribeTemplateRef') public unsubscribeTemplateRef:TemplateRef<any>;

  constructor(private authService:AuthService, overlay:Overlay, vcRef:ViewContainerRef, public modal:Modal, private dashboardService:UserDashboardServices) {
    this.userData = this.authService.loggedUser;
    this.authService.loggedUserChangeEvent.subscribe(user => {
      this.userData = user;
      this.user_name = this.userData.user_name;
      this.activeTab = this.tabs[0].id;
      overlay.defaultViewContainer = vcRef;
    });
    if (this.userData) {
      this.user_name = this.userData.user_name;
      this.activeTab = this.tabs[0].id;
      overlay.defaultViewContainer = vcRef;
    }
  }

  ngOnInit() {
  }

  onClickTab(tab) {
    this.activeTab = tab;
  }

  onBtnUnsubscribeClick(plan) {
    this.unsubscribeOption = "at_period_end";
    this.selectedPlan = plan;
    this.modal.open(this.unsubscribeTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  endSubscription(subscribeDialog) {
    this.dashboardService.unsubscribePlan(this.selectedPlan._id, this.unsubscribeOption == 'at_period_end').subscribe(
      response => {
        subscribeDialog.close();
      }
    );
  }
}
