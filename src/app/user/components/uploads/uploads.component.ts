import {Component, ViewChild, TemplateRef, ViewContainerRef, ChangeDetectorRef} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {UserDashboardServices} from "../../services/user-dashboard.service";
import {FilterService} from "../../services/filter.service";
import {ContestHistory} from "../../models/contest";
import {AuthService} from "../../../shared/services/auth.service";
// import {Overlay} from 'angular2-modal';
// import {overlayConfigFactory} from "angular2-modal";
// import {Modal, BSModalContext} from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'ngx-modialog';
import { Modal } from 'ngx-modialog/plugins/bootstrap';
import {UploadsService} from "../../services/uploads.service";
import {environment} from "../../../../environments/environment";
/**
 * Created by Hiren on 18-06-2017.
 */


@Component({
  selector: 'rp-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {

  constructor(private router:Router,
              private activatdRoute:ActivatedRoute,
              private uploadService:UploadsService,
              private dashboardService:UserDashboardServices,
              private authservice:AuthService,
              private overlay:Overlay,
              private vcRef:ViewContainerRef,
              public modal:Modal,
              private changeDetectionRef:ChangeDetectorRef,
              private filterService:FilterService) {
    overlay.defaultViewContainer = vcRef;
  }

  selectedHistory:ContestHistory;
  filename;
  userDetail = JSON.parse(localStorage.getItem('data'));
  configUpload = {
    // Change this to your upload POST address:
    server: 'https://api.dfsportgod.com/api/contest/history',
    maxFilesize: 50,
    acceptedFiles: '.csv',
    paramName: 'file',
    autoReset: 500,
    headers: {'Authorization': 'Bearer ' + environment.token}
  };
  uploads:ContestHistory[];
  mainDialog;
  subDialog;

  isLoading:boolean;
  isRestricted:boolean;

  // @ViewChild('downloadTemplateRef') public downloadTemplateRef:TemplateRef<any>;
  // @ViewChild('deleteTemplateRef') public deleteTemplateRef:TemplateRef<any>;
  // @ViewChild('fanDualInfo') public fanDualInfo:TemplateRef<any>;

  ngOnInit() {
    this.getUploads();
  }

  getUploads() {
    this.isLoading = true;
    this.uploadService.getUploads().subscribe(
      uploads => {
        this.uploads = uploads.data;
        this.isLoading = false;
        let count = 0;
        this.uploads.forEach(
          upload => {
            count += upload.imported;
          });
        if (!this.authservice.isSubscriber() && count >= 200) {
          this.isRestricted = true;
        }
        else {
          this.isRestricted = false;
        }
        this.changeDetectionRef.detectChanges();
      },
      error => {
        console.log("HTTP Error => ", error);
        //this.authservice.logout();
        //window.location.href = '/login';
      }
    )
  }

  fileUploadEvent(event) {
    let fileList:FileList = event.target.files;
    if (fileList.length > 0) {
      this.uploadService.uploadContests(fileList).subscribe(
        data => console.log('success'),
        error => console.log(error)
      );
    }
  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    this.getUploads();
  }


  onSending(file) {
    this.filename = file[0].name.split('-');
    this.filename = this.filename[0];
    //file[2].append('type', this.filename)
  }

  onTableRowClicked(history:ContestHistory) {
    this.selectedHistory = history;
    // this.modal.open(this.downloadTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext))
    const dialogRef = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('{{ selectedHistory.original_name }}')
      .body(`
        <div class="row">
          <div class="col-xs-4">File Size</div>
          <div class="col-xs-8">{{ getFileSize(selectedHistory.size) }} KB</div>
        </div>
        <div class="row">
          <div class="col-xs-4">Uploaded On</div>
          <div class="col-xs-8">{{ selectedHistory.created_at | date: 'dd MMM yyyy h:m a' }}</div>
        </div>
        <div class="row">
          <div class="col-xs-4">Records Created</div>
          <div class="col-xs-8">{{ selectedHistory.imported | number }}</div>
        </div>

        <button type="button" class="btn btn-primary" (click)="downloadClick();"><span
          class="glyphicon glyphicon-download-alt" area-hidden="true"></span> Download
        </button>
        <button type="button" class="btn btn-danger" (click)="deleteHistoryClicked(downloadDialog);"><span
          class="glyphicon glyphicon-trash" area-hidden="true"></span> Delete File
        </button>
        <button type="button" class="btn btn-default" (click)="downloadDialog.close(true)">Close</button>
        `)
      .open();
  }

  onFandualInfoClicked() {
    // this.modal.open(this.fanDualInfo, overlayConfigFactory({isBlocking: false}, BSModalContext));
  }

  deleteHistoryClicked(downloadDialog) {
    this.mainDialog = downloadDialog;
    // this.modal.open(this.deleteTemplateRef, overlayConfigFactory({isBlocking: false}, BSModalContext));

    const dialogRef = this.modal.alert()
      .size('lg')
      .showClose(true)
      .title('Are you sure?')
      .body(`
        <p>Deleting an entity history file will remove all associated results imported from this file.</p>
        <p>Are you sure you want to delete <strong>{{ selectedHistory.original_name }}</strong>?</p>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" (click)="confirmDeleteClicked(deleteDialog);"><span
            class="glyphicon glyphicon-trash" area-hidden="true"></span> Confirm Delete
          </button>
          <button type="button" class="btn btn-default" (click)="deleteDialog.close(true)">Close</button>
        </div>`)
      .open();
  }

  confirmDeleteClicked(deleteDialog) {
    this.isLoading = true;
    this.subDialog = deleteDialog;
    this.uploadService.deleteUpload(this.selectedHistory)
      .subscribe(
        data => {
          this.isLoading = false;
          this.subDialog.close(true);
          this.mainDialog.close(true);
          this.getUploads();
          console.log(data);
        }
      )
  }

  getFileSize(size:number):string {
    if (size) {
      return (size / 1024).toFixed(2);
    }
    return '0';
  }

  downloadClick() {
    let history = this.selectedHistory;
    this.uploadService.downloadFile(history)
      .subscribe(
        data => {
          let file = new Blob([data["_body"]], {type: 'text/csv'});
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(file);
          link.setAttribute('download', history.original_name);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      )
  }
}
