import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AdminDashboardService} from "../../services/admin-dashboard.service";
declare var jQuery:any;
import * as c3 from "c3";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  errorMsg:string = "";
  isLoading:boolean;

  activeMemberCount:number = 0;
  latestMembers:any[];

  @ViewChild('sevenDayChart') sevenDayChart:ElementRef;
  @ViewChild('thirtyDayChart') thirtyDayChart:ElementRef;
  @ViewChild('ninetyDayChart') ninetyDayChart:ElementRef;

  constructor(private authService:AuthService, private dashboardService:AdminDashboardService) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.retrieveDashboardData();
    this.retrieveLatestMembers();
  }

  retrieveDashboardData() {
    this.dashboardService.retrieveDashboardDetails()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let data = response.data;
            this.activeMemberCount = data.active;
            this.prepareChart(data['7Days'], this.sevenDayChart.nativeElement);
            this.prepareChart(data['30Days'], this.thirtyDayChart.nativeElement);
            this.prepareChart(data['90Days'], this.ninetyDayChart.nativeElement);
          }
          else {
            console.log("response error => ", response);
          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }


  prepareChart(data:any, element:any) {
    let chart = c3.generate({
      bindto: element,
      data: {
        columns: [
          ['amount', ...data.datas]
        ],
        types: {
          amount: 'area-spline'
        },
        colors: {
          'amount': '#22baa0'
        }
      },
      point: {
        show: false
      },
      axis: {
        x: {
          type: 'category',
          categories: [...data.labels],
          tick: {
            count: 10
          }
        }
      }
    });
  }

  retrieveLatestMembers() {
    this.dashboardService.retrieveLatestMembers()
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.latestMembers = response.data;
          }
          else {
            console.log("response error => ", response);
          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }
}
