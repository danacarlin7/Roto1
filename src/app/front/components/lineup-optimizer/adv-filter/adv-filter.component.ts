import {Component, Input, ViewEncapsulation, EventEmitter, Output} from "@angular/core";
import {AdvFilterSettings, Game} from "../../../models/adv-filter-setting.model";
import {LineupOppFilterCriteria} from "../../../models/filter-criteria.model";
import {LineupOppFilterConstants} from "../../../constants/lineup-opp.constants";
import {OptimizerPlayer} from "../../../models/player.model";
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
  maxExposureValue:number;
  salarySettingValue:any[];
  noBattingVsPitchers:boolean;

  projectionFilterValue:any[];
  salaryFilterValue:any[];
  valueFilterValue:any[];
  battingOrderFilterValue:any[];

  filters:LineupOppFilterCriteria[];

  gamesObj:any = {};

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
    });

    this.maxExposureSlider = jQuery("#me");
    this.maxExposureSlider.bootstrapSlider({
      min: 10,
      max: 100,
      value: 10
    });
    this.maxExposureValue = 10;
    this.maxExposureSlider.on("slide", (slideEvt) => {
      jQuery("#meSliderVal").text(slideEvt.value + "%");
      this.maxExposureValue = slideEvt.value;
    });

    this.salarySlider = jQuery("#mms");
    this.salarySlider.bootstrapSlider({
      range: true,
      max: 5,
      min: 0
    });
    this.salarySettingValue = [0, 5];
    this.salarySlider.on("slide", (slideEvt) => {
      let b = slideEvt.value;
      if (this._advFilterSettings) {
        this._advFilterSettings.salaryMin = b[0];
        this._advFilterSettings.salaryMax = b[1];
      }
      this.salarySettingValue = b;
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
    });
    this.salaryFilterSlider.on("slideStop", (slideEvt) => {
      this.salaryFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
    });
    this.valueFilterSlider = jQuery("#ValueFilter");
    this.valueFilterSlider.bootstrapSlider({
      min: 0,
      max: 4,
      step: 0.1,
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
    });
    this.battingFilterSlider.on("slideStop", (slideEvt) => {
      this.battingOrderFilterValue = slideEvt.value;
      this.emitFilterChangeEvent();
    });
  }

  updateSliders() {
    if (this.salarySlider) {
      let salarySliderValue = this.salarySlider.data('bootstrapSlider').getValue();
      this.salarySlider.bootstrapSlider({
        range: true,
        max: this._advFilterSettings.salaryMax,
        min: this._advFilterSettings.salaryMin,
        step: 100
      });
      this.salarySettingValue = [this._advFilterSettings.salaryMin, this._advFilterSettings.salaryMax]
      this.salarySlider.bootstrapSlider('setValue', [this._advFilterSettings.salaryMin, this._advFilterSettings.salaryMax]);
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
        step: 0.1
      });
      this.valueFilterSlider.bootstrapSlider('setValue', [this._advFilterSettings.valueMin, this._advFilterSettings.valueMax]);
      this.valueFilterValue = [this._advFilterSettings.valueMin, this._advFilterSettings.valueMax];
    }
    this.battingOrderFilterValue = [0, 9];
  }

  emitFilterChangeEvent() {
    this.filterCriteriaChanged.emit(this.filters);
  }

  getFilters():LineupOppFilterCriteria[] {
    this.prepareFilters();
    return this.filters;
  }

  prepareFilters() {
    this.filters = [];
    this.filters.push({
      filterKey: LineupOppFilterConstants.PROJECTION,
      minValue: this.projectionFilterValue[0],
      maxValue: this.projectionFilterValue[1],
      filterValue: this.projectionFilterValue
    });

    this.filters.push({
      filterKey: LineupOppFilterConstants.PLAYER_SALARY,
      minValue: this.salaryFilterValue[0],
      maxValue: this.salaryFilterValue[1],
      filterValue: this.salaryFilterValue
    });

    this.filters.push({
      filterKey: LineupOppFilterConstants.PLAYER_BATTING_ORDER,
      minValue: this.battingOrderFilterValue[0],
      maxValue: this.battingOrderFilterValue[1],
      filterValue: this.battingOrderFilterValue
    });

    this.filters.push({
      filterKey: LineupOppFilterConstants.PLAYER_VALUE,
      minValue: this.valueFilterValue[0],
      maxValue: this.valueFilterValue[1],
      filterValue: this.valueFilterValue
    });
  }

  onGameClick(game:Game) {
    console.log("Game => ", game);
  }

}
