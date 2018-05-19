import { Component, ViewEncapsulation } from "@angular/core";

declare var $:any;

@Component({
  selector: "app-root",
  templateUrl: "./admin.component.html",
  styleUrls: [
    // "../proAdmin/assets/css/paper-dashboard.css",
    "../../assets/css/admin/paper-dashboard.css",
    "../../assets/css/admin/themify-icons.css",
    "./admin.component.css"
  ],
  encapsulation: ViewEncapsulation.None
})

export class AdminComponent {}
