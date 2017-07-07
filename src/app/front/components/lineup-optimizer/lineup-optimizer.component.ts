import {Component} from "@angular/core";
import {Slate} from "../../models/slate.model";
import {LineupOptimizerService} from "../../services/lineup-optimizer.service";
import {OptimizerPlayer} from "../../models/player.model";
/**
 * Created by Hiren on 02-07-2017.
 */


@Component({
  selector: 'rp-lineup-optimizer',
  templateUrl: './lineup-optimizer.component.html',
  styleUrls: [
    './lineup-optimizer.component.css',
    '../../../../assets/css/main.css',
    '../../../../assets/css/main-responsive.css'
  ]
})
export class LineupOptimizerComponent {

  selectedOperator:string = 'FanDuel';
  selectedSport:string = 'MLB';
  selectedSlate:number;
  slates:Slate[];
  players:OptimizerPlayer[];

  constructor(private optimizerService:LineupOptimizerService) {

  }

  ngOnInit() {
    this.getSlates();
  }

  onSlateChanged(event:any) {
    console.log("selected slate => ", event.target.value);
    this.selectedSlate = event.target.value;
    this.getPlayers(this.selectedOperator, this.selectedSport, this.selectedSlate)
  }

  getSlates() {
    this.optimizerService.retrieveSlates(this.selectedOperator, this.selectedSport)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.slates = response.data;
            console.log("slates => ", this.slates);
          } else {

          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }

  getPlayers(operator:string, sport:string, slateId:number) {
    this.optimizerService.retrievePlayers(operator, sport, slateId)
      .subscribe(
        response => {
          if (response.statusCode == 200) {
            this.players = response.data;
            console.log("Players => ", this.players);
          } else {

          }
        },
        error => {
          console.log("http error => ", error);
        }
      )
  }

}
