import {Component} from "@angular/core";
import {LineupOptimizerService} from "../../../services/lineup-optimizer.service";
import {GeneratedLineup, LineupPlayer, UsedPlayer} from "../../../models/generated-lineup.model";
import {Router} from "@angular/router";
/**
 * Created by Hiren on 16-07-2017.
 */

@Component({
  selector: 'rp-generated-lineups',
  templateUrl: './generated-lineups.component.html',
  styleUrls: ['./generated-lineups.component.css']
})
export class GeneratedLineupsComponent {

  lineups:GeneratedLineup[];
  usedPlayers:UsedPlayer[];

  activeUsedPlayerTab:'all'|'p'|'h' = 'all';

  constructor(private optimizerService:LineupOptimizerService, private router:Router) {

  }

  ngOnInit() {
    if (this.optimizerService.generatedLineups) {
      this.lineups = this.optimizerService.generatedLineups.lineups;
      this.usedPlayers = this.optimizerService.generatedLineups.usedPlayers;
    }
    else {
      this.router.navigate(['lineup-optimizer']);
    }
  }

  getBattingOrderByPlayerId(id:number):number {
    return this.optimizerService.getBattingOrderByPlayerId(id);
  }

  getOpponentNameByPlayerId(id:number):string {
    return this.optimizerService.getOpponentByPlayerId(id);
  }

  getHomeTeamByPlayerId(id:number) {
    return this.optimizerService.getHomeTeamByPlayerId(id);
  }

  getSlateName():string {
    return this.optimizerService.selectedSlate ? this.optimizerService.activeSlate.Slate : 'All Slates';
  }

  getUsedPlayers():UsedPlayer[] {
    let players:UsedPlayer[];
    switch (this.activeUsedPlayerTab) {
      case 'all':
        players = this.usedPlayers;
        break;
      case 'p':
        players = this.usedPlayers.filter(
          currPlayer => {
            return (currPlayer.position.toLowerCase() == 'p')
          }
        );
        break;
      case 'h':
        players = this.usedPlayers.filter(
          currPlayer => {
            return (currPlayer.position.toLowerCase() != 'p')
          }
        );
        break;
      default:
        players = this.usedPlayers;
        break;
    }
    return players;
  }

}
