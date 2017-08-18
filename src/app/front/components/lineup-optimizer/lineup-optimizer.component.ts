import {Component, ViewChild} from "@angular/core";
import {Slate} from "../../models/slate.model";
import {LineupOptimizerService} from "../../services/lineup-optimizer.service";
import {OptimizerPlayer} from "../../models/player.model";
import {AdvFilterSettings, Game} from "../../models/adv-filter-setting.model";
import {LineupOppFilterCriteria} from "../../models/filter-criteria.model";
import {AdvFilterComponent} from "./adv-filter/adv-filter.component";
import {LineupOppFilterConstants} from "../../constants/lineup-opp.constants";
import {LineupPlayerFilter} from "../../ng-pipes/lineup-opp-filter.pipe";
import {Router} from "@angular/router";
import {GeneratedLineupRecords} from "../../models/generated-lineup.model";
import {AdvFilterValue} from "../../models/adv-filter-value.model";
import {AuthService} from "../../../shared/services/auth.service";
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
  allPlayers:OptimizerPlayer[];
  players:OptimizerPlayer[];
  advFilterSettings:AdvFilterSettings;
  isLoading:boolean;
  games:Game[];
  stackingData:{team:string,teamId:number}[];
  lockedPlayers:number[] = [];
  todayDate = new Date();

  advFilterValue:AdvFilterValue;
  isSavedFiltersApplied:boolean;

  @ViewChild('advFilterPopup') advFilterPopup:AdvFilterComponent;

  constructor(private optimizerService:LineupOptimizerService, private router:Router, private authService:AuthService) {
    this.selectedOperator = this.optimizerService.selectedOperator;
    this.optimizerService.selectedSport = this.selectedSport;
    this.selectedSlate = this.optimizerService.selectedSlate;
    this.selectedGame = this.optimizerService.selectedGame;
    this.searchStr = this.optimizerService.searchStr;
  }

  initiateData() {
    this.getSlates();
    this.playersListUpdated();
  }

  operatorChanged(name:string) {
    if (this.selectedOperator != name) {
      this.selectedOperator = name;
      this.optimizerService.selectedOperator = name;
      this.optimizerService.players = [];
      this.initiateData();
    }
  }

  isSlateChanged:boolean;

  onSlateChanged(event:any) {
    console.log("selected slate => ", event.target.value);
    this.selectedSlate = event.target.value;
    this.optimizerService.selectedSlate = event.target.value;
    this.selectedGame = this.optimizerService.selectedGame = 0;
    this.getFilterSettings(this.selectedOperator, this.selectedSport, this.selectedSlate);
    this.isSlateChanged = true;
  }

  getSlates() {
    this.isLoading = true;
    this.optimizerService.retrieveSlates(this.selectedOperator, this.selectedSport)
      .subscribe(
        response => {
          this.isLoading = false;
          if (response.statusCode == 200) {
            this.slates = response.data;
            this.slates = this.slates.filter(slate => slate.Slate != "Arcade Mode");
            console.log("slates => ", this.slates);
            this.getPlayers(this.selectedOperator, this.selectedSport, this.selectedSlate);
          } else {

          }
        },
        error => {
          this.isLoading = false;
          console.log("http error => ", error);
        }
      )
  }

  playersListUpdated() {
    this.optimizerService.players$.subscribe(
      players => {
        this.isLoading = false;
        this.allPlayers = players as OptimizerPlayer[];
        this.players = this.allPlayers.map(player => player);
        console.log("No of players => ", this.players.length);
      }
    )
  }

  getPlayers(operator:string, sport:string, slateId:number) {
    this.isLoading = true;
    this.optimizerService.getPlayers(operator, sport, slateId)
      .subscribe(
        response => {
          this.isLoading = false;
          this.allPlayers = response as OptimizerPlayer[];
          this.players = this.allPlayers.map(player => player);
          console.log("No of players => ", this.players.length);
          this.getStackingData(this.selectedSport, this.selectedSlate);
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
              if (this.authService.isLoggedIn()) {
                this.optimizerService.retrieveSavedAdvFilterValue()
                  .subscribe(
                    savedFilterResponse => {
                      if (savedFilterResponse.statusCode == 200) {
                        this.advFilterValue = savedFilterResponse.data;
                        if (this.advFilterValue) {
                          this.isSavedFiltersApplied = true;
                        }
                      }
                      this.advFilterSettings = response.data;
                      console.log("in retrieve method advFilterValue => ", this.advFilterValue);
                      console.log("in retrieve method advFilterSettings => ", this.advFilterSettings);
                      this.games = this.advFilterSettings.games;
                      if (this.isSlateChanged) {
                        setTimeout(() => {
                          this.applyFilters();
                          this.isSlateChanged = false;
                        }, 50);
                      }
                    }
                  );
              } else {
                this.advFilterSettings = response.data;
                console.log("in retrieve method advFilterSettings => ", this.advFilterSettings);
                this.games = this.advFilterSettings.games;
                if (this.isSlateChanged) {
                  setTimeout(() => {
                    this.applyFilters();
                    this.isSlateChanged = false;
                  }, 50);
                }
              }
            }
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

  getStackingData(sport:string, slateId:number) {
    this.optimizerService.retrieveStackingData(sport, slateId)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.stackingData = response.data;
            console.log("Stacking data => ", this.stackingData);
            this.getFilterSettings(this.selectedOperator, this.selectedSport, this.selectedSlate);
            this.stackingData = this.stackingData.sort((n1, n2) => {
              if (n1.team > n2.team) {
                return 1;
              }
              if (n1.team < n2.team) {
                return -1;
              }
              return 0;
            })
          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }

  selectedGameChanged(event:any) {
    this.selectedGame = event.target.value;
    this.optimizerService.selectedGame = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    console.log("applyFilters method called");
    let filters:LineupOppFilterCriteria[] = [];
    filters.push(<LineupOppFilterCriteria>{
      filterKey: LineupOppFilterConstants.GAME_TYPE,
      filterValue: this.selectedGame == 0 ? this.games.map(game => game.gameId) : [this.selectedGame],
      maxValue: 0,
      minValue: 0
    });
    filters = filters.concat(this.advFilterPopup.getFilters());
    this.optimizerService.applyFilters(filters);
  }

  onBtnGenerateLineupClick() {
    this.isLoading = true;
    let activeSlate = this.slates.filter(slate => {
      if (slate.SlateID == this.selectedSlate) {
        return true;
      }
    });
    if (activeSlate && activeSlate.length) {
      this.optimizerService.activeSlate = activeSlate[0];
    }

    this.optimizerService.generateLineups(this.prepareLineupData(), this.selectedOperator, this.selectedSport)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.isLoading = false;
            console.log("GenerateLineup response => ", response);
            this.optimizerService.generatedLineups = response.data as GeneratedLineupRecords;
            this.router.navigate(['generated-lineups']);
          }
        },
        error => {
          this.isLoading = false;
          console.log("GenerateLineup response error=> ", error);
        }
      )
  }

  prepareLineupData() {
    let lineupData = {
      sport: this.selectedSport,
      site: this.selectedOperator,
      players: this.players
        .filter(currPlayer => !currPlayer.isExcluded)
        .map(currPlayer => {
          return {_id: currPlayer._id, maxExposure: currPlayer.exposureValue, force: currPlayer.isLocked}
        })
    };

    if (this.advFilterPopup.variabilityValue) {
      lineupData['variation'] = this.advFilterPopup.variabilityValue;
    }

    if (this.advFilterPopup.maxExposureValue != 100) {
      lineupData['maxExposure'] = this.advFilterPopup.maxExposureValue;
    }

    if (this.advFilterPopup.noOfUniquePlayersValue != 1) {
      lineupData['numberOfUniquePlayers'] = this.advFilterPopup.noOfUniquePlayersValue;
    }

    if (this.advFilterPopup.noOfLineupValue != 1) {
      lineupData['numberOfLineups'] = this.advFilterPopup.noOfLineupValue;
    }

    if (this.selectedOperator == 'FanDuel' && this.advFilterPopup.salarySettingValue[0] != 20000) {
      lineupData['minTotalSalary'] = this.advFilterPopup.salarySettingValue[0];
    }

    if (this.selectedOperator == 'FanDuel' && this.advFilterPopup.salarySettingValue[1] != 35000) {
      lineupData['maxTotalSalary'] = this.advFilterPopup.salarySettingValue[1];
    }

    if (this.selectedOperator == 'DraftKings' && this.advFilterPopup.salarySettingValue[0] != 30000) {
      lineupData['minTotalSalary'] = this.advFilterPopup.salarySettingValue[0];
    }

    if (this.selectedOperator == 'DraftKings' && this.advFilterPopup.salarySettingValue[1] != 50000) {
      lineupData['maxTotalSalary'] = this.advFilterPopup.salarySettingValue[1];
    }

    lineupData['noBattersVsPitchers'] = this.advFilterPopup.noBattingVsPitchers;
    lineupData['minMaxPlayersFromTeam'] = this.prepareMinMaxPlayerFromTeam();

    return lineupData;
  }

  prepareMinMaxPlayerFromTeam():any[] {
    let teams = [];
    teams = this.advFilterPopup.getMinMaxPlayerFromTeam();
    let stackData = this.advFilterPopup.getStakingData();
    if (stackData && stackData.length) {
      stackData.forEach(
        stackTeam => {
          let teamFlag:boolean = false;
          teams.forEach(team => {
            if (stackTeam.name == team.teamName) {
              teamFlag = true;
              team.minPlayers = stackTeam.players;
              team.maxPlayers = stackTeam.players;
              return;
            }
          });
          if (!teamFlag) {
            teams.push({
              teamName: stackTeam.name,
              minPlayers: stackTeam.players,
              maxPlayers: stackTeam.players
            })
          }
        })
    }
    return teams;
  }

  btnExcludePlayerClicked(player:OptimizerPlayer) {
    player.isExcluded = true;
    this.unlockPlayer(player);
    this.filterPlayers(this.searchStr);
  }

  onAdvFilterCriteriaChangedEvent(filters:LineupOppFilterCriteria[]) {
    this.applyFilters();
  }

  onSearchStrChanged(event) {
    this.searchStr = event.target.value;
    this.filterPlayers(this.searchStr);
  }

  filterPlayers(searchStr:string = "") {
    let filters = new LineupPlayerFilter();
    this.players = filters.transform(this.allPlayers, ['FirstName', 'LastName', 'fullName'], searchStr);
  }

  togglePlayerLock(player:OptimizerPlayer) {
    if (player.isLocked) {
      this.unlockPlayer(player);
    }
    else {
      if (this.lockedPlayers && this.lockedPlayers.length < 6) {
        this.lockPlayer(player);
      }
    }
  }

  lockPlayer(player:OptimizerPlayer) {
    player.isLocked = true;
    if (this.lockedPlayers && this.lockedPlayers.indexOf(player.PlayerID) == -1) {
      this.lockedPlayers.push(player.PlayerID);
    }
  }

  unlockPlayer(player:OptimizerPlayer) {
    player.isLocked = false;
    if (this.lockedPlayers && this.lockedPlayers.indexOf(player.PlayerID) >= 0) {
      this.lockedPlayers.splice(this.lockedPlayers.indexOf(player.PlayerID), 1);
    }
  }

  onExposureTxtboxBlurEvent(event, player:OptimizerPlayer) {
    let value = event.target.value;
    if (value > 100) {
      event.target.value = 100;
      player.exposureValue = 100;
    }
  }

  onAdvFilterSettingsViewReady() {
    /*this.advFilterValue = {
     variability: 20,
     numberOfUniquePlayers: 4,
     mixMaxSalary: [25000, 30000],
     numberOfLineups: 10,
     maxExposure: 80,
     noBatterVsPitchers: true,
     projectionFilter: [5, 10],
     salaryFilter: [2000, 2200],
     valueFilter: [2, 4],
     battingOrderFilter: [3, 7],
     playerPerTeams: [{teamName: 'ARI', minPlayers: 2, maxPlayers: 3}, {
     teamName: 'ATL',
     minPlayers: 1,
     maxPlayers: 3
     }, {teamName: 'BAL', minPlayers: 0, maxPlayers: 2}],
     stackingTeams: [{name: 'ARI', players: 3}, {name: 'ATL', players: 1}, {name: 'BAL', players: 2}]
     };*/
    this.initiateData();
  }

  onSaveAdvFilterValueEvent(filterValue:AdvFilterValue) {
    this.optimizerService.updateAdvFilterValue(filterValue)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            console.log("Filter value saved");
            this.advFilterValue = filterValue;
          }
        }
      )
  }

  onRemoveAdvFilterValueEvent() {
    this.onSaveAdvFilterValueEvent(null);
  }
}
