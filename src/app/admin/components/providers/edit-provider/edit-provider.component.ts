import {Component, OnInit} from "@angular/core";
import {CustomAuthService} from "../../../../shared/services/auth.service";
import {AdminDashboardService} from "../../../services/admin-dashboard.service";
import {Router} from "@angular/router";
import {NgForm, FormGroup, FormControl, Validators} from "@angular/forms";
import {Analyst} from "../../../models/provider.model";
/**
 * Created by Hiren on 30-07-2017.
 */


@Component({
  selector: 'rp-edit-providers',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {

  selectedProvider:Analyst;
  providerForm:FormGroup;

  isError:boolean;
  errorMsg:string;
  isLoading:boolean;

  constructor(private authService:CustomAuthService, private providerService:AdminDashboardService, private router:Router) {
    this.selectedProvider = this.providerService.selectedProvider;
    if (!this.selectedProvider) {
      this.router.navigate(['admin/providers'])
    }
  }

  ngOnInit() {
    this.providerForm = new FormGroup({});
    if (this.selectedProvider) {
      this.providerForm = new FormGroup({
        fName: new FormControl(this.selectedProvider.first_name, Validators.required),
        lName: new FormControl(this.selectedProvider.last_name, Validators.required),
        email: new FormControl(this.selectedProvider.email, Validators.required),
        bio: new FormControl(this.selectedProvider.analyst_info.biodata, Validators.required),
      });
    }
  }

  onProvidersEdit() {
    if (this.providerForm.valid) {
      let value = this.providerForm.value;
      this.selectedProvider.first_name = value.fName;
      this.selectedProvider.last_name = value.lName;
      this.selectedProvider.email = value.email;
      this.selectedProvider.analyst_info.biodata = value.bio;

      this.isLoading = true;
      this.isError = false;
      this.errorMsg = '';
      this.providerService.editProvider(this.selectedProvider)
        .subscribe(
          response => {
            if (response.statusCode == 200) {
              this.isLoading = false;
              this.router.navigate(['admin/providers'])
            }
          },
          error => {
            this.isLoading = false;
            this.isError = true;
            this.errorMsg = error.message;
          }
        )
    }
  }

  btnCancelClicked() {
    this.providerService.selectedProvider = null;
    this.router.navigate(['/admin/providers'])
  }

}
