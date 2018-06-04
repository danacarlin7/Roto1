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

import { NgForm } from '@angular/forms';

// import { Subscription } from 'rxjs';
// import {Overlay} from 'angular2-modal';
// import {overlayConfigFactory} from "angular2-modal";
// import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
// import { Overlay } from 'ngx-modialog';
// import { Modal } from 'ngx-modialog/plugins/bootstrap';

import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// import 'rxjs/Rx';
import { AuthService } from "../../../../shared/new-services/auth.service";
import { LoggedUser } from "../../../../shared/models/logged-user.model";
import { UserService } from "../../../new-services/user.service";
import { Router } from "@angular/router";
import { environment } from "../../../../../environments/environment";
import { User } from "../../../../shared/models/user";

@Component({
  selector: 'rp-profile-pic',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {

  filename;
  userResp: User;


  public config: DropzoneConfigInterface = {
    url: environment.api_end_point + 'api/uploadImage',
    acceptedFiles: 'image/*',
    paramName: 'file',
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    headers: { 'Authorization': 'Bearer ' + environment.token }
  };

  // configUpload = {
  //   // Change this to your upload POST address:
  //   server: environment.api_end_point + 'api/uploadImage',
  //    // 'https://api.dfsportgod.com/api/uploadImage',
  //   maxFilesize: 50,
  //   acceptedFiles: 'image/*',
  //   paramName: 'file',
  //   autoReset: 500,
  //   clickable: true,
  //   headers: { 'Authorization': 'Bearer ' + environment.token }
  // };

  constructor(private authService: AuthService, private router: Router) {}

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
    console.log('no, baby');
    console.log(event);
  }

  onUploadSuccess(event) {
    console.log("Profile Pic updated");
    this.authService.retrieveLoggedUserInfo()
      .subscribe(response => {
        this.userResp = response;
        console.log(this.userResp);
      },error => {
        console.log("http error => ", error);
      });
  }

  onSending(file) {
    console.log('sending');
    this.filename = file[0].name.split('-');
    this.filename = this.filename[0];
  }

}
