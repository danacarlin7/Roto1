import {Component, ViewChild} from "@angular/core";
import {Slate} from "../../models/slate.model";
import {LineupOptimizerService} from "../../services/lineup-optimizer.service";
import {OptimizerPlayer} from "../../models/player.model";
import {AdvFilterSettings, Game} from "../../models/adv-filter-setting.model";
import {LineupOppFilterCriteria} from "../../models/filter-criteria.model";
import {AdvFilterComponent} from "./adv-filter/adv-filter.component";
import {LineupOppFilterConstants} from "../../constants/lineup-opp.constants";
/**
 * Created by Hiren on 02-07-2017.
 */

declare var jQuery:any;

@Component({
  selector: 'rp-lineup-optimizer',
  templateUrl: './lineup-optimizer.component.html',
  styleUrls: ['./lineup-optimizer.component.css']
})
export class LineupOptimizerComponent {

  searchStr:string = '';
  selectedOperator:string = 'FanDuel';
  selectedSport:string = 'MLB';
  selectedSlate:number = 0;
  selectedGame:number = 0;
  slates:Slate[];
  players:OptimizerPlayer[];
  advFilterSettings:AdvFilterSettings;
  isLoading:boolean;
  games:Game[];

  @ViewChild('advFilterPopup') advFilterPopup:AdvFilterComponent;

  constructor(private optimizerService:LineupOptimizerService) {

  }

  ngOnInit() {
    this.initiateData();
  }

  initiateData() {
    this.getSlates();
    this.getPlayers(this.selectedOperator, this.selectedSport, this.selectedSlate);
    this.getFilterSettings(this.selectedOperator, this.selectedSport, this.selectedSlate);
  }

  operatorChanged(name:string) {
    if (this.selectedOperator != name) {
      this.selectedOperator = name;
      this.optimizerService.players = [];
      this.initiateData();
    }
  }

  onSlateChanged(event:any) {
    console.log("selected slate => ", event.target.value);
    this.selectedSlate = event.target.value;
    this.getFilterSettings(this.selectedOperator, this.selectedSport, this.selectedSlate);
  }

  getSlates() {
    this.isLoading = true;
    this.optimizerService.retrieveSlates(this.selectedOperator, this.selectedSport)
      .subscribe(
        response => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.slates = response.data;
            console.log("slates => ", this.slates);
          } else {

          }
        },
        error => {
          this.isLoading = false;
          console.log("http error => ", error);
        }
      )
  }

  getPlayers(operator:string, sport:string, slateId:number) {
    this.isLoading = true;
    this.optimizerService.getPlayers(operator, sport, slateId)
      .subscribe(
        response => {
          this.isLoading = false;
          this.players = response as OptimizerPlayer[];
          console.log("No of players => ", this.players.length);
        },
        error => {
          this.isLoading = false;
          console.log("http error => ", error);
        }
      )
  }

  getFilterSettings(operator:string, sport:string, slateId:number) {
    this.isLoading = true;
    this.optimizerService.retrieveAdvFilterSettings(operator, sport, slateId)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.isLoading = false;
            if (!(response.data instanceof Array)) {
              this.advFilterSettings = response.data;
              this.games = this.advFilterSettings.games;
            }
            console.log("Filter settings => ", this.advFilterSettings);
          } else {
            this.isLoading = false;
          }
        },
        error => {
          this.isLoading = false;
          console.log("http error => ", error);
        }
      )
  }

  selectedGameChanged(event:any) {
    this.selectedGame = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    let filters:LineupOppFilterCriteria[] = [];
    filters.push(<LineupOppFilterCriteria>{
      filterKey: LineupOppFilterConstants.GAME_TYPE,
      filterValue: this.selectedGame,
      maxValue: 0,
      minValue: 0
    });
    filters = filters.concat(this.advFilterPopup.getFilters());
    this.optimizerService.applyFilters(filters);
  }

  onBtnGenerateLineupClick() {
    this.optimizerService.generateLineups(this.prepareLineupData(), this.selectedOperator, this.selectedSport)
      .subscribe(
        response => {
          console.log("GenerateLineup response => ", response);
        },
        error => {
          console.log("GenerateLineup response error=> ", error);
        }
      )
  }

  prepareLineupData() {
    return {
      sport: this.selectedSport,
      site: this.selectedOperator,
      players: this.players
        .filter(currPlayer => !currPlayer.isExcluded)
        .map(currPlayer => {
          return {_id: currPlayer._id, maxExposure: currPlayer.exposureValue}
        }),
      variation: this.advFilterPopup.variabilityValue,
      maxExposure: this.advFilterPopup.maxExposureValue,
      noBattersVsPitchers: this.advFilterPopup.noBattingVsPitchers,
      numberOfUniquePlayers: this.advFilterPopup.noOfUniquePlayersValue,
      numberOfLineups: this.advFilterPopup.noOfLineupValue,
      minTotalSalary: this.advFilterPopup.salarySettingValue[0],
      maxTotalSalary: this.advFilterPopup.salarySettingValue[1],
      minMaxPlayersFromTeam: this.prepareMinMaxPlayerFromTeam()
    };
  }

  prepareMinMaxPlayerFromTeam():any[] {
    let teams = [];
    this.advFilterSettings.games.forEach(
      currGame => {
        if (currGame.homeTeamMinValue || currGame.homeTeamMaxValue) {
          teams.push({
            teamName: currGame.homeTeam,
            minPlayers: currGame.homeTeamMinValue,
            maxPlayers: currGame.homeTeamMaxValue
          });
        }
        if (currGame.awayTeamMinValue || currGame.awayTeamMaxValue) {
          teams.push({
            teamName: currGame.awayTeam,
            minPlayers: currGame.awayTeamMinValue,
            maxPlayers: currGame.awayTeamMaxValue
          })
        }
      }
    );
    return teams;
  }

  btnExcludePlayerClicked(player:OptimizerPlayer) {
    player.isExcluded = true;
  }

  onAdvFilterCriteriaChangedEvent(filters:LineupOppFilterCriteria[]) {
    this.applyFilters();
  }

}
