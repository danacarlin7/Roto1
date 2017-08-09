import {Component, ViewContainerRef} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../shared/services/auth.service";
import {Overlay} from 'angular2-modal';
/**
 * Created by Hiren on 24-05-2017.
 */


@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})

export class ExcelComponent{
  isLoading:boolean;
  filename;
  configUpload = {
    // Change this to your upload POST address:
    server: 'https://api.dfsportgod.com/api/uploadExcel',
    maxFilesize: 50,
    paramName: 'file',
    autoReset: 500,
    headers: {'Authorization': 'Bearer ' + environment.token}
  };
  constructor(private authService:AuthService, private router:Router, overlay:Overlay, vcRef:ViewContainerRef) {

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

}
