import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
//import {Member} from '../../../forms/member';
import {Subscription} from 'rxjs';
import {CustomAuthService} from "../../../shared/services/auth.service";
import {AdminDashboardService} from "../../services/admin-dashboard.service";
import {UserDashboardServices} from "../../../user/services/user-dashboard.service";
declare var jQuery:any;

interface Member {
  email:string,
  first_name:string,
  last_name:string,
  password:string
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  allmembers = [];
  searchMembers = [];
  changePasswordPopup:boolean;
  busy:Subscription;
  filterQuery:String = "";
  filterType:String = "";
  selectedType:any;
  allSearch = [];

  constructor(private memberService:AdminDashboardService, private authService:CustomAuthService, private router:Router) {
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
    this.busy = this.memberService.getMembers().subscribe(
      members => {
        this.allmembers = members.data;
        this.allSearch = members.data;
      },
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    )
  }

  filterMember() {
    var type = this.filterType['value'];
    this.searchMembers = this.allmembers.filter(function (el) {
      var result = "";
      for (var key in el) {

        result += el[key];
      }
      return result.toLowerCase().indexOf(this.filterQuery.toLowerCase()) > -1;
    }.bind(this));

    this.allSearch = [];
    for (let memb in this.searchMembers) {
      switch (type) {
        case 'verified':
          if (this.searchMembers[memb].is_verified == true)
            this.allSearch.push(this.searchMembers[memb]);
          break;
        case 'unverified':
          if (this.searchMembers[memb].is_verified == false)
            this.allSearch.push(this.searchMembers[memb]);
          break;
        case 'memberspace':
          if (this.searchMembers[memb].is_memberspace == true)
            this.allSearch.push(this.searchMembers[memb]);
          break;
        default:
          this.allSearch = this.searchMembers;
          break;
      }
    }


  }

  sendVerifyEmail(email) {
    this.memberService.verifyEmail(email).subscribe(
      success => {
        console.log("Mail sent");
      }
    )
  }

  changePassword(email) {
    this.changePasswordPopup = true
  }


  delete(id) {
    this.memberService.deleteMember(id).subscribe(
      success => console.log('a'),
      error => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    );
  }


  edit(member) {
    this.memberService.editMember(member).subscribe(
      success => {
      },
      error => {
        //this.memberService.logout();
        //this.router.navigate(['/login']);
      }
    )
  }

  changeStatus(id) {
    this.memberService.changeMemberStatus(id).subscribe(
      success => {
        console.log('success')
      }
    )
  }

  onChangePassword(f:any) {

  }
}


@Component({
  selector: 'app-members',
  templateUrl: './add.component.html',
  styleUrls: ['./members.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private authService:CustomAuthService,private memberService:AdminDashboardService, private router:Router) {
  }

  ngOnInit() {

  }

  onMemberAdd(form:NgForm) {
    form.value.is_memberspace = true;
    this.memberService.saveMember(form.value).subscribe(
      success => this.router.navigate(['/admin/members']),
      error => {
        console.log("Add member error => ", error);
        //this.memberService.logout();
        //this.router.navigate(['/login']);
      }
    )
  }

}


@Component({
  selector: 'app-members',
  templateUrl: './uploadmember.component.html',
  styleUrls: ['./members.component.css']
})
export class UploadMemberComponent implements OnInit {

  userDetail = JSON.parse(localStorage.getItem('data'));
  configUpload = {
    // Change this to your upload POST address:
    server: 'https://api.dfsportgod.com/api/uploadMembers',
    maxFilesize: 50,
    acceptedFiles: '.csv',
    paramName: 'file',
    headers: {'Authorization': 'Bearer ' + this.userDetail.token}
  };

  constructor(private memberService:CustomAuthService, private router:Router) {
  }

  ngOnInit() {

  }

  onUploadError(event) {
    console.log(event);
  }

  onUploadSuccess(event) {
    this.router.navigate(['/admin/members']);
  }

}
