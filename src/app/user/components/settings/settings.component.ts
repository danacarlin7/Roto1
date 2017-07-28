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
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  tabs = [
    {
      id: 'image',
      name: 'Profile Image'
    },
    {
      id: 'profile',
      name: 'Your Profile'
    },
    {
      id: 'change-password',
      name: 'Change Password'
    },
    {
      id: 'subscriptions',
      name: 'Subscribe Plan'
    }
  ];

  activeTab = null;

  userData: LoggedUser;
  user_name = '';
  unsubscribeOption = "at_period_end";

  selectedPlan;

  filename;
  configUpload = {
    // Change this to your upload POST address:
    server: 'https://api.dfsportgod.com/api/uploadImage',
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    paramName: 'file',
    autoReset: 500,
    headers: {'Authorization': 'Bearer ' + environment.token}
  };
  mainDialog;
  subDialog;

  isLoading: boolean;

  @ViewChild('unsubscribeTemplateRef') public unsubscribeTemplateRef: TemplateRef<any>;

  constructor(private authService:AuthService, private router:Router, overlay:Overlay, vcRef:ViewContainerRef, public modal:Modal, private dashboardService:UserDashboardServices) {
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

  fileUploadEvent(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.authService.uploadProfile(fileList).subscribe(
        data => console.log('success'),
        error => console.log(error)
      );
    }
  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    // this.getUploads();
  }

  onSending(file) {
    this.filename = file[0].name.split('-');
    this.filename = this.filename[0];
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
