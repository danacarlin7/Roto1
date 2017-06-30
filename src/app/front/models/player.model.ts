import {Injury} from "./injury.model";
/**
 * Created by Hiren on 01-07-2017.
 */

export interface Player{
  player_id: number;
  player_stats_global_id: number;
  player_sports_data_id: string;
  player_first_name: string;
  player_last_name: string;
  player_fantasy_data_id: number;
  player_position: string;
  player_link: string;
  injury_status: boolean;
  injury: Injury;
}
