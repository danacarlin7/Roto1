import {Component, Input, ViewEncapsulation, EventEmitter, Output} from "@angular/core";
import {AdvFilterSettings, Game} from "../../../models/adv-filter-setting.model";
import {LineupOppFilterCriteria} from "../../../models/filter-criteria.model";
import {LineupOppFilterConstants} from "../../../constants/lineup-opp.constants";
import {OptimizerPlayer} from "../../../models/player.model";
import {AdvFilterValue} from "../../../models/adv-filter-value.model";
/**
 * Created by Hiren on 09-07-2017.
 */

declare var jQuery:any;

@Component({
  selector: 'rp-adv-filter',
  templateUrl: './adv-filter.component.html',
  styleUrls: ['./adv-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdvFilterComponent {


  isSettingsUpdated:boolean;

  @Input()
  selectedOperator:string;

  variabilitySlider:any;
  noOfUniquePlayersSlider:any;
  salarySlider:any;
  noOfLineupSlider:any;
  maxExposureSlider:any;
  projectionFilterSlider:any;
  salaryFilterSlider:any;
  valueFilterSlider:any;
  battingFilterSlider:any;


  variabilityValue:number;
  noOfUniquePlayersValue:number;
  noOfLineupValue:number;
  maxExposureValue:number = 100;
  salarySettingValue:any[] = [];
  noBattingVsPitchers:boolean;

  projectionFilterValue:any[];
  salaryFilterValue:any[];
  valueFilterValue:any[];
  battingOrderFilterValue:any[];

  @Input()
  advFilterValue:AdvFilterValue;

  filters:LineupOppFilterCriteria[];

  stackingTeam1:{name:string,players:number} = {name: '-', players: 0};
  stackingTeam2:{name:string,players:number} = {name: '-', players: 0};
  stackingTeam3:{name:string,players:number} = {name: '-', players: 0};

  gamesObj:any = {};
  private _stackingData:{team:string,teamId:number}[];
  @Input()
  set stackingData(value:{team:string,teamId:number}[]) {
    this._stackingData = value;
    this.prepareStacks();
  }

  stack1:{team:string,teamId:number}[] = [];
  stack2:{team:string,teamId:number}[] = [];
  stack3:{team:string,teamId:number}[] = [];

  @Output()
  saveAdvFilterValueEvent:EventEmitter<AdvFilterValue> = new EventEmitter<AdvFilterValue>();

  @Output()
  removeAdvFilterValueEvent:EventEmitter<null> = new EventEmitter<null>();

  @Output()
  viewRenderedEvent:EventEmitter<any> = new EventEmitter<any>();

  @Output()
  filterCriteriaChanged:EventEmitter<LineupOppFilterCriteria[]> = new EventEmitter<LineupOppFilterCriteria[]>();

  private _advFilterSettings:AdvFilterSettings;

  get advFilterSettings():AdvFilterSettings {
    return this._advFilterSettings;
  }

  @Input()
  set advFilterSettings(value:AdvFilterSettings) {
    this._advFilterSettings = value;
    this.updateSliders();
    if (this._advFilterSettings) {
      this.resetGames();
    }
    if (this.advFilterValue) {
      console.log("in setter advFilterValue => ", this.advFilterValue);
      setTimeout(()=> {
        this.setSliderValues();
        this.setGameValues();
        this.setStackingValues();
        this.emitFilterChangeEvent();
      }, 20);
    }
  }

  constructor() {

  }

  ngAfterViewInit() {
    this.variabilitySlider = jQuery("#Variability");
    this.variabilitySlider.bootstrapSlider({
      min: 0,
      max: 100,
      value: 0
    });
    this.variabilityValue = 0;
    this.variabilitySlider.on("slide", (slideEvt) => {
      jQuery("#VariabilitySliderVal").text(slideEvt.value + "%");
      this.variabilityValue = slideEvt.value;
      this.isSettingsUpdated = true;
    });

    this.noOfLineupSlider = jQuery("#nlp");
    this.noOfLineupSlider.bootstrapSlider({
      min: 1,
      max: 200,
      value: 1
    });
    this.noOfLineupValue = 1;
    this.noOfLineupSlider.on("slide", (slideEvt) => {
      jQuery("#nlpSliderVal").text(slideEvt.value);
      this.noOfLineupValue = slideEvt.value;
      this.isSettingsUpdated = true;
    });

    this.noOfUniquePlayersSlider = jQuery("#nup");
    this.noOfUniquePlayersSlider.bootstrapSlider({
      min: 1,
      max: 5,
      value: 1
    });
    this.noOfUniquePlayersValue = 1;
    this.noOfUniquePlayersSlider.on("slide", (slideEvt) => {
      jQuery("#nupSliderVal").text(slideEvt.value);
      this.noOfUniquePlayersValue = slideEvt.value;
      this.isSettingsUpdated = true;
    });

    this.maxExposureSlider = jQuery("#me");
    this.maxExposureSlider.bootstrapSlider({
      min: 10,
      max: 100,
      value: 100
    });
    this.maxExposureValue = 100;
    this.maxExposureSlider.on("slide", (slideEvt) => {
      jQuery("#meSliderVal").text(slideEvt.value + "%");
      this.maxExposureValue = slideEvt.value;
      this.isSettingsUpdated = true;
    });

    this.salarySlider = jQuery("#mms");
    this.salarySlider.bootstrapSlider({
      range: true,
      max: 6,
      min: 0
    });
    this.salarySettingValue = [0, 6];
    this.salarySlider.on("slide", (slideEvt) => {
      let b = slideEvt.value;
      this.salarySettingValue = b;
      this.isSettingsUpdated = true;
    });

    this.projectionFilterSlider = jQuery("#ProjectionFilter");
    this.projectionFilterSlider.bootstrapSlider({
      min: 1,
      max: 34.50,
      step: 0.5,
      value: [1, 20.50]
    });
    this.projectionFilterSlider.on("slide", function (slideEvt) {
      var b = slideEvt.value.toString();
      var a = b.split(",");
      jQuery("#ProjectionMinFilterSliderVal").text(a[0]);
      jQuery("#ProjectionMaxFilterSliderVal").text(a[1]);
      this.isSettingsUpdated = true;
    });
    this.projectionFilterSlider.on("slideStop", (slideEvt) => {
      this.projectionFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
    });
    this.salaryFilterSlider = jQuery("#SalaryFilter");
    this.salaryFilterSlider.bootstrapSlider({
      min: 100,
      max: 1000,
      step: 100,
      value: [100, 500]
    });
    this.salaryFilterSlider.on("slide", function (slideEvt) {
      var b = slideEvt.value.toString();
      var a = b.split(",");
      jQuery("#SalaryMinFilterSliderVal").text(a[0]);
      jQuery("#SalaryMaxFilterSliderVal").text(a[1]);
      this.isSettingsUpdated = true;
    });
    this.salaryFilterSlider.on("slideStop", (slideEvt) => {
      this.salaryFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
    });
    this.valueFilterSlider = jQuery("#ValueFilter");
    this.valueFilterSlider.bootstrapSlider({
      min: 0,
      max: 4,
      step: 0.05,
      value: [0, 2.3]
    });
    this.valueFilterSlider.on("slide", function (slideEvt) {
      var b = slideEvt.value.toString();
      var a = b.split(",");
      jQuery("#ValueMinFilterSliderVal").text(a[0]);
      jQuery("#ValueMaxFilterSliderVal").text(a[1]);
    });
    this.valueFilterSlider.on("slideStop", (slideEvt) => {
      this.valueFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
      this.isSettingsUpdated = true;
    });
    this.battingFilterSlider = jQuery("#BattingOrder");
    this.battingFilterSlider.bootstrapSlider({
      min: 0,
      max: 9,
      step: 1,
      value: [0, 9]
    });
    this.battingFilterSlider.on("slide", function (slideEvt) {
      var b = slideEvt.value.toString();
      var a = b.split(",");
      jQuery("#BattingOrderMinSliderVal").text(a[0]);
      jQuery("#BattingOrderMaxSliderVal").text(a[1]);
      this.isSettingsUpdated = true;
    });
    this.battingFilterSlider.on("slideStop", (slideEvt) => {
      this.battingOrderFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
    });

    this.viewRenderedEvent.emit(true);
  }

  updateSliders() {
    if (this.variabilitySlider) {
      this.variabilityValue = 0;
      this.variabilitySlider.bootstrapSlider('setValue', this.variabilityValue);
    }
    if (this.noOfLineupSlider) {
      this.noOfLineupValue = 1;
      this.noOfLineupSlider.bootstrapSlider('setValue', this.noOfLineupValue);
    }
    if (this.noOfUniquePlayersSlider) {
      this.noOfUniquePlayersValue = 1;
      this.noOfUniquePlayersSlider.bootstrapSlider('setValue', this.noOfUniquePlayersValue);
    }
    if (this.maxExposureSlider) {
      this.maxExposureValue = 100;
      this.maxExposureSlider.bootstrapSlider('setValue', this.maxExposureValue);
    }
    if (this.salarySlider) {
      let salarySliderValue = this.salarySlider.data('bootstrapSlider').getValue();
      let maxSalary:number;
      let minSalary:number;
      switch (this.selectedOperator) {
        case 'FanDuel':
          minSalary = 20000;
          maxSalary = 35000;
          break;
        case 'DraftKings':
          minSalary = 30000;
          maxSalary = 50000;
          break;
      }
      this.salarySlider.bootstrapSlider({
        range: true,
        max: maxSalary,
        min: minSalary,
        step: 100
      });
      this.salarySettingValue = [minSalary, maxSalary];
      this.salarySlider.bootstrapSlider('setValue', [minSalary, maxSalary]);
    }
    if (this.salaryFilterSlider) {
      let salarySliderValue = this.salaryFilterSlider.data('bootstrapSlider').getValue();
      this.salaryFilterSlider.bootstrapSlider({
        range: true,
        max: this._advFilterSettings.salaryMax,
        min: this._advFilterSettings.salaryMin,
        step: 100
      });
      this.salaryFilterSlider.bootstrapSlider('setValue', [this._advFilterSettings.salaryMin, this._advFilterSettings.salaryMax]);
      this.salaryFilterValue = [this._advFilterSettings.salaryMin, this._advFilterSettings.salaryMax];
    }
    if (this.projectionFilterSlider) {
      let projectionFilterValue = this.projectionFilterSlider.data('bootstrapSlider').getValue();
      this.projectionFilterSlider.bootstrapSlider({
        range: true,
        min: this._advFilterSettings.projectionMin,
        max: this._advFilterSettings.projectionMax,
        step: 0.5
      });
      this.projectionFilterSlider.bootstrapSlider('setValue', [this._advFilterSettings.projectionMin, this._advFilterSettings.projectionMax]);
      this.projectionFilterValue = [this._advFilterSettings.projectionMin, this._advFilterSettings.projectionMax];
    }
    if (this.valueFilterSlider) {
      let valueFilterSliderValue = this.valueFilterSlider.data('bootstrapSlider').getValue();
      this.valueFilterSlider.bootstrapSlider({
        range: true,
        max: this._advFilterSettings.valueMax,
        min: this._advFilterSettings.valueMin,
        step: 0.05
      });
      this.valueFilterSlider.bootstrapSlider('setValue', [this._advFilterSettings.valueMin, this._advFilterSettings.valueMax]);
      this.valueFilterValue = [this._advFilterSettings.valueMin, this._advFilterSettings.valueMax];
    }
    this.battingOrderFilterValue = [0, 9];
  }

  setSliderValues() {
    if (this.salarySlider) {
      this.salarySettingValue = this.advFilterValue.mixMaxSalary;
      console.log("this.advFilterValue.mixMaxSalary", this.advFilterValue.mixMaxSalary);
      console.log("this.salarySettingValue => ", this.salarySettingValue);
      this.salarySlider.bootstrapSlider('setValue', this.salarySettingValue);
    }
    if (this.noOfUniquePlayersSlider) {
      this.noOfUniquePlayersValue = this.advFilterValue.numberOfUniquePlayers;
      this.noOfUniquePlayersSlider.bootstrapSlider('setValue', this.noOfUniquePlayersValue);
    }
    if (this.variabilitySlider) {
      this.variabilityValue = this.advFilterValue.variability;
      this.variabilitySlider.bootstrapSlider('setValue', this.variabilityValue);
    }
    if (this.noOfLineupSlider) {
      this.noOfLineupValue = this.advFilterValue.numberOfLineups;
      this.noOfLineupSlider.bootstrapSlider('setValue', this.noOfLineupValue);
    }
    if (this.maxExposureSlider) {
      this.maxExposureValue = this.advFilterValue.maxExposure;
      this.maxExposureSlider.bootstrapSlider('setValue', this.maxExposureValue);
    }
    this.noBattingVsPitchers = this.advFilterValue.noBatterVsPitchers;
    if (this.salaryFilterSlider) {
      this.salaryFilterValue = this.advFilterValue.salaryFilter;
      this.salaryFilterSlider.bootstrapSlider('setValue', this.salaryFilterValue);
    }
    if (this.projectionFilterSlider) {
      this.projectionFilterValue = this.advFilterValue.projectionFilter;
      this.projectionFilterSlider.bootstrapSlider('setValue', this.projectionFilterValue);
    }
    if (this.valueFilterSlider) {
      this.valueFilterValue = this.advFilterValue.valueFilter;
      this.valueFilterSlider.bootstrapSlider('setValue', this.valueFilterValue);
    }
    if (this.battingFilterSlider) {
      this.battingOrderFilterValue = this.advFilterValue.battingOrderFilter;
      this.battingFilterSlider.bootstrapSlider('setValue', this.battingOrderFilterValue);
    }
  }

  setGameValues() {
    if (this.advFilterValue.playerPerTeams) {
      this.advFilterValue.playerPerTeams.forEach(
        currValue => {
          this._advFilterSettings.games.forEach(
            game => {
              if (game.homeTeam == currValue.teamName) {
                game.homeTeamMinValue = currValue.minPlayers;
                game.homeTeamMaxValue = currValue.maxPlayers;
                return;
              }
              if (game.awayTeam == currValue.teamName) {
                game.awayTeamMinValue = currValue.minPlayers;
                game.awayTeamMaxValue = currValue.maxPlayers;
                return;
              }
            })
        })
    }
  }

  setStackingValues() {
    if (this.advFilterValue.stackingTeams) {
      this.advFilterValue.stackingTeams.forEach(
        (currValue, i) => {
          if (i == 0) {
            this.stackingTeam1 = currValue;
          } else if (i == 1) {
            this.stackingTeam2 = currValue;
          } else if (i == 2) {
            this.stackingTeam3 = currValue;
          }
        }
      )
    }
  }

  emitFilterChangeEvent() {
    this.filterCriteriaChanged.emit(this.getFilters());
  }

  getFilters():LineupOppFilterCriteria[] {
    this.prepareFilters();
    return this.filters;
  }

  prepareStacks() {
    if (this._stackingData) {
      this.stack1 = [];
      this.stack2 = [];
      this.stack3 = [];
      this._stackingData.forEach(
        value => {
          if (value.team != this.stackingTeam2.name && value.team != this.stackingTeam3.name) {
            this.stack1.push(value);
          }
        }
      );
      this._stackingData.forEach(
        value => {
          if (value.team != this.stackingTeam1.name && value.team != this.stackingTeam3.name) {
            this.stack2.push(value);
          }
        }
      );
      this._stackingData.forEach(
        value => {
          if (value.team != this.stackingTeam1.name && value.team != this.stackingTeam2.name) {
            this.stack3.push(value);
          }
        }
      )
    }
  }

  prepareFilters() {
    this.filters = [];
    if (this.projectionFilterValue[0] != this._advFilterSettings.projectionMin || this.projectionFilterValue[0] != this._advFilterSettings.projectionMax) {
      this.filters.push({
        filterKey: LineupOppFilterConstants.PROJECTION,
        minValue: this.projectionFilterValue[0],
        maxValue: this.projectionFilterValue[1],
        filterValue: this.projectionFilterValue
      });
    }

    if (this.salaryFilterValue[0] != this._advFilterSettings.salaryMin || this.salaryFilterValue[0] != this._advFilterSettings.salaryMax) {
      this.filters.push({
        filterKey: LineupOppFilterConstants.PLAYER_SALARY,
        minValue: this.salaryFilterValue[0],
        maxValue: this.salaryFilterValue[1],
        filterValue: this.salaryFilterValue
      });
    }

    if (this.battingOrderFilterValue[0] != 0 || this.battingOrderFilterValue[0] != 9) {
      this.filters.push({
        filterKey: LineupOppFilterConstants.PLAYER_BATTING_ORDER,
        minValue: this.battingOrderFilterValue[0],
        maxValue: this.battingOrderFilterValue[1],
        filterValue: this.battingOrderFilterValue
      });
    }
    if (this.valueFilterValue[0] != this._advFilterSettings.valueMin || this.valueFilterValue[0] != this._advFilterSettings.valueMax) {
      this.filters.push({
        filterKey: LineupOppFilterConstants.PLAYER_VALUE,
        minValue: this.valueFilterValue[0],
        maxValue: this.valueFilterValue[1],
        filterValue: this.valueFilterValue
      });
    }
  }

  onGameClick(game:Game) {
    console.log("Game => ", game);
  }

  getStakingData():{name:string,players:number}[] {
    let data = [];
    if (this.stackingTeam1.name != '-' && this.stackingTeam1.players) {
      data.push(this.stackingTeam1);
    }
    if (this.stackingTeam2.name != '-' && this.stackingTeam2.players) {
      data.push(this.stackingTeam2);
    }
    if (this.stackingTeam3.name != '-' && this.stackingTeam3.players) {
      data.push(this.stackingTeam3);
    }
    console.log("stacking data => ", data);
    return data;
  }

  getMaxGameValue():number {
    let value:number;
    switch (this.selectedOperator) {
      case 'FanDuel':
        value = 4;
        break;
      case 'DraftKings':
        value = 8;
        break;
    }
    return value;
  }

  onGlobalMaxValueChanged(event) {
    if (this.getMaxGameValue() < +event.target.value) {
      event.target.value = this.getMaxGameValue();
    }
    this._advFilterSettings.games.forEach(
      game => {
        game.homeTeamMaxValue = game.awayTeamMaxValue = +event.target.value;
      }
    )
  }

  validateStakingPlayerCount(team:{name:string,players:number}) {
    let playerCount = this.stackingTeam1.players + this.stackingTeam2.players + this.stackingTeam3.players;
    switch (this.selectedOperator) {
      case 'FanDuel':
        if (playerCount > 9) {
          team.players = 0;
        }
        break;
      case 'DraftKings':
        if (playerCount > 10) {
          team.players = 0;
        }
        break;
    }
  }

  validateHomeTeamMinValue(event, game) {
    let value = event.target.value;
    if (value > game.homeTeamMaxValue) {
      event.target.value = 0;
      game.homeTeamMinValue = 0;
    }
  }

  validateAwayTeamMinValue(event, game) {
    let value = event.target.value;
    if (value > game.awayTeamMaxValue) {
      event.target.value = 0;
      game.awayTeamMinValue = 0;
    }
  }

  saveAdvFilters() {
    let filterValue:AdvFilterValue = <AdvFilterValue>{
      variability: this.variabilityValue,
      numberOfUniquePlayers: this.noOfUniquePlayersValue,
      mixMaxSalary: this.salarySettingValue,
      numberOfLineups: this.noOfLineupValue,
      maxExposure: this.maxExposureValue,
      noBatterVsPitchers: this.noBattingVsPitchers,
      projectionFilter: this.projectionFilterValue,
      salaryFilter: this.salaryFilterValue,
      valueFilter: this.valueFilterValue,
      battingOrderFilter: this.battingOrderFilterValue,
      playerPerTeams: this.getMinMaxPlayerFromTeam(),
      stackingTeams: this.getStakingData()
    };
    this.saveAdvFilterValueEvent.emit(filterValue);
  }

  getMinMaxPlayerFromTeam():{teamName:string,minPlayers:number,maxPlayers:number}[] {
    let teams:{teamName:string,minPlayers:number,maxPlayers:number}[] = [];
    let defaultMinValue = 0;
    let defaultMaxValue = 0;
    if (this.selectedOperator == 'FanDuel') {
      defaultMinValue = 0;
      defaultMaxValue = 4;
    }
    if (this.selectedOperator == 'DraftKings') {
      defaultMinValue = 0;
      defaultMaxValue = 8;
    }
    this.advFilterSettings.games.forEach(
      currGame => {
        if (currGame.homeTeamMinValue != defaultMinValue || currGame.homeTeamMaxValue != defaultMaxValue) {
          teams.push({
            teamName: currGame.homeTeam,
            minPlayers: +currGame.homeTeamMinValue,
            maxPlayers: +currGame.homeTeamMaxValue
          });
        }
        if (currGame.awayTeamMinValue != defaultMinValue || currGame.awayTeamMaxValue != defaultMaxValue) {
          teams.push({
            teamName: currGame.awayTeam,
            minPlayers: +currGame.awayTeamMinValue,
            maxPlayers: +currGame.awayTeamMaxValue
          })
        }
      }
    );
    return teams;
  }

  onBtnSaveAdvFilterValueClicked() {
    if (this.isSettingsUpdated) {
      this.saveAdvFilters();
      this.isSettingsUpdated = false;
    }
  }

  onBtnRestoreDefaultClicked() {
    this.updateSliders();
    this.resetGames();
    this.resetStacking();
    this.noBattingVsPitchers = false;
    this.emitFilterChangeEvent();
    this.isSettingsUpdated = true;
    this.removeAdvFilterValueEvent.emit(null);
  }

  resetGames() {
    this._advFilterSettings.games.forEach(
      game => {
        game.homeTeamMinValue = 0;
        game.awayTeamMinValue = 0;
        game.awayTeamMaxValue = this.getMaxGameValue();
        game.homeTeamMaxValue = this.getMaxGameValue();
      }
    )
  }

  resetStacking() {
    this.stackingTeam1 = {name: '-', players: 0};
    this.stackingTeam2 = {name: '-', players: 0};
    this.stackingTeam3 = {name: '-', players: 0};
    this.prepareStacks();
  }
}
