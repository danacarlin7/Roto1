import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
//import {Provider} from '../../../forms/provider';
import {Subscription} from 'rxjs';
import {AuthService} from "../../../shared/services/auth.service";
import {AdminDashboardService} from "../../services/admin-dashboard.service";
import {UserDashboardServices} from "../../../user/services/user-dashboard.service";
declare var jQuery: any;

interface Provider {
  email: string,
  first_name: string,
  last_name: string,
  password: string
}

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  allproviders = [];
  searchProviders = [];
  changePasswordPopup: boolean;
  busy: Subscription;
  filterQuery: String = "";
  filterType: String = "";
  selectedType: any;
  allSearch = [];

  constructor(private providerService: AdminDashboardService, private authService: AuthService, private router: Router) {
    this.selectedType = [
      {
        label: "All",
        value: ""
      }, {
        label: "Verified",
        value: "verified"
      }, {
        label: "Unverified",
        value: "unverified"
      }
      , {
        label: "Memberspace",
        value: "memberspace"
      }
    ];
    this.filterType = this.selectedType[0]
  }

  ngOnInit() {
    this.busy = this.providerService.getProviders().subscribe(
      providers => {
        this.allproviders = providers.data;
        this.allSearch = providers.data;
      },
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    )
  }

  filterProvider() {
    var type = this.filterType['value'];
    this.searchProviders = this.allproviders.filter(function (el) {
      var result = "";
      for (var key in el) {

        result += el[key];
      }
      return result.toLowerCase().indexOf(this.filterQuery.toLowerCase()) > -1;
    }.bind(this));

    this.allSearch = [];
    for (let memb in this.searchProviders) {
      switch (type) {
        case 'verified':
          if (this.searchProviders[memb].is_verified == true)
            this.allSearch.push(this.searchProviders[memb]);
          break;
        case 'unverified':
          if (this.searchProviders[memb].is_verified == false)
            this.allSearch.push(this.searchProviders[memb]);
          break;
        case 'memberspace':
          if (this.searchProviders[memb].is_memberspace == true)
            this.allSearch.push(this.searchProviders[memb]);
          break;
        default:
          this.allSearch = this.searchProviders;
          break;
      }
    }


  }

  sendVerifyEmail(email) {
    this.providerService.verifyEmail(email).subscribe(
      success => {
        console.log("Mail sent");
      }
    )
  }

  changePassword(email) {
    this.changePasswordPopup = true
  }


  delete(id) {
    this.providerService.deleteProvider(id).subscribe(
      success => console.log('a'),
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    );
  }


  edit(provider) {
    this.providerService.editProvider(provider).subscribe(
      success => {
      },
      error => {
        //this.providerService.logout();
        //this.router.navigate(['/login']);
      }
    )
  }

  changeStatus(id) {
    this.providerService.changeProviderStatus(id).subscribe(
      success => {
        console.log('success')
      }
    )
  }

  onChangePassword(f: any) {

  }
}


@Component({
  selector: 'app-providers',
  templateUrl: './add.component.html',
  styleUrls: ['./providers.component.css']
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


@Component({
  selector: 'app-providers',
  templateUrl: './edit.component.html',
  styleUrls: ['./providers.component.css']
})
export class EditProviderComponent implements OnInit {

  constructor(private authService: AuthService, private providerService: AdminDashboardService, private router: Router) {
  }

  ngOnInit() {

  }

  onProvidersEdit(form: NgForm) {
    form.value.is_providerspace = true;
    form.value.is_tool = true;
    form.value.role = "provider";
    console.log(form.value);
    // this.providerService.saveProvider(form.value).subscribe(
    //   success => this.router.navigate(['/admin/providers']),
    //   error => {
    //     console.log("Add provider error => ", error);
    //     //this.providerService.logout();
    //     //this.router.navigate(['/login']);
    //   }
    // )
  }

}

// @Component({
//   selector: 'app-providers',
//   templateUrl: './uploadprovider.component.html',
//   styleUrls: ['./providers.component.css']
// })
// export class UploadProviderComponent implements OnInit {
//
//   userDetail = JSON.parse(localStorage.getItem('data'));
//   configUpload = {
//     // Change this to your upload POST address:
//     server: 'https://api.dfsportgod.com/api/uploadProviders',
//     maxFilesize: 50,
//     acceptedFiles: '.csv',
//     paramName: 'file',
//     headers: {'Authorization': 'Bearer ' + this.userDetail.token}
//   };
//
//   constructor(private providerService:AuthService, private router:Router) {
//   }
//
//   ngOnInit() {
//
//   }
//
//   onUploadError(event) {
//     console.log(event);
//   }
//
//   onUploadSuccess(event) {
//     this.router.navigate(['/admin/providers']);
//   }
//
// }
