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

  getBattingOrderByPlayerId(id:number):number{
    return this.optimizerService.getBattingOrderByPlayerId(id);
  }

}
