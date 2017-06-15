import {Component, Input} from "@angular/core";

import {trigger, state, style, animate, transition} from '@angular/animations';
import {ContestTopWin} from "../../../models/contest";
import {DashboardFilter} from "../../../models/dashboard-filter.model";
import {UserDashboardServices} from "../../../services/user-dashboard.service";

/**
 * Created by Hiren on 26-04-2017.
 */


@Component({
  selector: 'dfs-dashboard-top-wins',
  templateUrl: './dashboard-top-wins.component.html',
  styleUrls: ['./dashboard-top-wins.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'scale(0.98)', opacity: 0}),
          animate('225ms', style({transform: 'scale(1)', opacity: 1}))
        ])
      ]
    )
  ]
})
export class DashboardTopWinsComponent {

  readyState = 'inactive';
  errorMsg:string = "";
  isLoading:boolean;
  winRecords:ContestTopWin[];
  private _dashboardFilter:DashboardFilter;

  @Input() set dashoardFilter(filter:DashboardFilter) {
    this._dashboardFilter = filter;
  }
}
