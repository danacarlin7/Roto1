import {Component} from "@angular/core";
import {DashboardFilter} from "../../models/dashboard-filter.model";
import {UserContestData} from "../../models/user-contest-data.model";
import {ContestTopWin} from "../../models/contest";
import {UserDashboardServices} from "../../services/user-dashboard.service";
/**
 * Created by Hiren on 11-06-2017.
 */

declare var jQuery:any;

@Component({
  selector: 'rp-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  dashboardFilter:DashboardFilter;
  staticsData:UserContestData;
  topWinData:ContestTopWin[];
  errorMsg:string = "";
  isLoading:boolean;
  loadingCounter:number = 0;

  constructor(private dashboardService:UserDashboardServices) {

  }

  updateDashboard(filterData:DashboardFilter) {
    this.isLoading = true;
    this.dashboardFilter = filterData;
    this.getContestTopWinData(this.dashboardFilter);
    this.getContestData(this.dashboardFilter);
  }

  getContestData(data:DashboardFilter = null) {
    this.loadingCounter++;
    this.dashboardService.getContestReport(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.staticsData = UserContestData.getObject(response.data);
            console.log("staticsData => ", this.staticsData);
            this.loadingCounter--;
            if (this.loadingCounter == 0) {
              this.isLoading = false;
            }
          }
          else {

          }
        },
        error => {
          this.errorMsg = error.message;
        }
      )
  }

  getContestTopWinData(data:DashboardFilter = null) {
    this.loadingCounter++;
    this.dashboardService.getContestTopWinData(data)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.topWinData = response.data;
            console.log("topWinData => ", this.topWinData);
            this.loadingCounter--;
            if (this.loadingCounter == 0) {
              this.isLoading = false;
            }
          }
          else {

          }
        },
        error => {
          this.errorMsg = error.message;
          console.log("error => ", error);
        }
      )
  }


}
