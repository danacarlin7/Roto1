import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { AdminDashboardService } from '../services/admin-dashboard.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {
  private id: string;
  private member;
  private memberSubscription: Subscription;

  constructor(private route: ActivatedRoute, private adminDashboardService: AdminDashboardService) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.member = data.member;
    });

    console.log(this.member);
  }
}
