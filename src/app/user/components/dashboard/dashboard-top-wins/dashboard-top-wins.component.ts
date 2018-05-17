import { Component, Input } from "@angular/core";

import { trigger, state, style, animate, transition } from '@angular/animations';
import { ContestTopWin } from "../../../models/contest";
import { DashboardFilter } from "../../../models/dashboard-filter.model";
// import { UserService } from "../../../new-services/user.service";

/**
 * Created by Hiren on 26-04-2017.
 */


@Component({
  selector: 'rp-dashboard-top-wins',
  templateUrl: './dashboard-top-wins.component.html',
  styleUrls: ['./dashboard-top-wins.component.css']
})
export class DashboardTopWinsComponent {
  readyState = 'inactive';
  errorMsg: string = "";
  isLoading: boolean;
  @Input() winRecords: ContestTopWin[];
}
