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
  lineupTabs = NewsTabs;
  lineupTabConstants = NewsTabConstants;

  activeTab:string = this.lineupTabConstants.NBA;

  lineupRecords:LineupRecord[] = [];
  isLoading:boolean;

  constructor(private router:Router, private activeRoute:ActivatedRoute, private frontService:FrontService) {
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(
      params => {
        if (params.hasOwnProperty('tab')) {
          this.getData(params['tab']);
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


  getData(tabName:string) {
    this.isLoading = true;
    this.frontService.retrieveDailyLineups(tabName)
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
    data.forEach(
      currData => {
        let firstTeam:Lineup = currData.data[0];
        let secondTeam:Lineup = currData.data[1];
        this.lineupRecords.push(<LineupRecord>{
          game_time: firstTeam.game_date,
          first_team: <TeamInfo>{
            name: firstTeam ? firstTeam.team_name : '',
            logo_url: firstTeam ? firstTeam.team_wikipedia_logo_url : '',
            lineup_players: firstTeam ? firstTeam.team_lineups[0].lineup_data : [],
          },
          second_team: <TeamInfo>{
            name: secondTeam ? secondTeam.team_name : '',
            logo_url: secondTeam ? secondTeam.team_wikipedia_logo_url : '',
            lineup_players: secondTeam ? secondTeam.team_lineups[0].lineup_data : [],
          }
        })
      });
    console.log("this.lineupRecords => ", this.lineupRecords);
  }
}
