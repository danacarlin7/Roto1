import {Component} from "@angular/core";
import {NewsTabs, NewsTabConstants} from "../../constants/menu.constants";
import {Router, ActivatedRoute} from "@angular/router";
import {FrontService} from "../../services/front.service";
import {Lineup, LineupRecord, TeamInfo, TeamLineup, LineupData} from "../../models/lineup.model";
/**
 * Created by Hiren on 01-07-2017.
 */

@Component({
  selector: 'rp-daily-lineup',
  templateUrl: './daily-lineup.component.html',
  styleUrls: ['./daily-lineup.component.css']
})
export class DailyLineupComponent {

  todayDate = new Date();

  lineupTabs = NewsTabs;
  lineupTabConstants = NewsTabConstants;

  activeTab:string = this.lineupTabConstants.MLB;
  activeFilter = 'today';

  lineupRecords:LineupRecord[] = [];
  isLoading:boolean;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private frontService:FrontService) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty('tab')) {
          this.getData(params['tab'], 'today');
          this.activeTab = params['tab'];
        }
        else {
          this.router.navigate(['/lineups'], {queryParams: {tab: this.activeTab}})
        }
      }
    )
  }

  onLineupTabChanged(tabName:{value:string,label:string}) {
    this.activeTab = tabName.value;
    this.router.navigate(['/lineups'], {queryParams: {tab: tabName.value}})
  }


  getData(tabName:string, timePeriod:string) {
    this.isLoading = true;
    this.activeFilter = timePeriod;
    this.frontService.retrieveDailyLineups(tabName, timePeriod)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            let data:Array<any> = response.data;
            this.prepareLineupRecords(data);
            console.log("lineup records data => ", data);
          } else {
            console.log('response error => ', response);
          }
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          console.log('http error => ', error);
        }
      )
  }

  prepareLineupRecords(data:any[]) {
    this.lineupRecords = [];

    data.forEach(currData => {
        console.log("data", currData);
        let firstTeam:Lineup = currData.data[0] ? currData.data[0] : false;
        let secondTeam:Lineup = currData.data[1] ?  currData.data[1] : false;

        this.lineupRecords.push(<LineupRecord>{
          game_time: firstTeam.game_time,
          game_date: firstTeam.game_date,
          first_team: <TeamInfo>{
            name: firstTeam.team_code ? firstTeam.team_code : firstTeam.team_name ? firstTeam.team_name : '',
            logo_url: firstTeam ? firstTeam.team_wikipedia_logo_url : '',
            lineup_players: firstTeam ? firstTeam.team_lineups[0].lineup_data : [],
          },
          second_team: <TeamInfo>{
            name: secondTeam.team_code ? secondTeam.team_code : secondTeam.team_name ? secondTeam.team_name : '',
            logo_url: secondTeam ? secondTeam.team_wikipedia_logo_url : '',
            lineup_players: secondTeam ? secondTeam.team_lineups[0].lineup_data : [],
          }
        })
      });
    console.log("this.lineupRecords => ", this.lineupRecords);
  }
}
