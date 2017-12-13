import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Member } from "../models/members.model"
import { AdminDashboardService } from './admin-dashboard.service';
import { Injectable } from '@angular/core';
import moment = require('moment');

@Injectable()
export class MembersResolver implements Resolve<String[][]> {

  constructor(private adminDashboardService: AdminDashboardService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.adminDashboardService.getMembers().map(
      members => {
        return members.data.map(member => {
          const created_at = moment(member.created_at).format("MMM D, YYYY");

          if (member.email === "jonathan.zhou96@gmail.com") console.log(member);

          return {
            name: member.first_name + " " + member.last_name,
            email: member.email,
            isSubscribe: member.is_subscribe,
            createdAt: created_at,
            lastSubscription: "Last Subscription",
            id: member._id,
            subscriptions: member.subscriptions
          };
        });
      },
    );
  }
}
