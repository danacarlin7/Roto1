import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../../shared/services/auth.service";
import {AdminDashboardService} from "../../../services/admin-dashboard.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
/**
 * Created by Hiren on 30-07-2017.
 */


@Component({
  selector: 'rp-add-providers',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {

  constructor(private authService: AuthService, private providerService: AdminDashboardService, private router: Router) {
  }

  ngOnInit() {

  }

  onProvidersAdd(form: NgForm) {
    form.value.is_providerspace = true;
    form.value.is_tool = true;
    form.value.role = "provider";
    console.log(form.value);
    this.providerService.saveProvider(form.value).subscribe(
      success => this.router.navigate(['/admin/providers']),
      error => {
        console.log("Add provider error => ", error);
        //this.providerService.logout();
        //this.router.navigate(['/login']);
      }
    )
  }

}
