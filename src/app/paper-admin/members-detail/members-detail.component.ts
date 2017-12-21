import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {
  private id: string;
  private member: Object;
  private memberSubscription: Subscription;

  constructor(private route: ActivatedRoute, private adminDashboardService: AdminDashboardService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params["id"];
    });

    const allMembers = this.adminDashboardService.allMembers;

    if (Object.keys(allMembers).length !== 0) {
      this.member = allMembers[this.id];
      console.log(this.member);
    } else {
      this.memberSubscription = this.adminDashboardService.allMembersUpdated
        .subscribe(
          (membersUpdated) => {
            this.member = allMembers[this.id];
            console.log(this.member);
          }
        );
    }
  }
}
