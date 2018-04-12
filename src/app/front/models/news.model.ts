import {Player} from "./player.model";
import {Team} from "./team.model";
/**
 * Created by Hiren on 01-07-2017.
 */

export interface News{
  _id: string;
  news_date_time: Date;
  news_id: number;
  sport: string;
  news_date: string;
  news_priority: number;
  news_headline: string;
  news_notes: string;
  news_analysis: string;
  team: Team;
  /*IG 02/07/2018 - interface of Team
  team_wikipedia_logo_url: string;
  team_wikipedia_word_mark_url: string;
  team_city: string;
  team_nickname: string;
  team_name: string;
  team_sports_data_id: string;
  team_stats_global_id: string;
  team_code: string;
  team_id: number;*/
  player: Player;
  /*IG 02/07/2018 - interface of Player
  player_id: number;
  player_stats_global_id: number;
  player_sports_data_id: string;
  player_first_name: string;
  player_last_name: string;
  player_fantasy_data_id: number;
  player_position: string;
  player_link: string;
  injury_status: boolean;
  player_image: string;
  injury: Injury;
  *****************
  interface of Injury
  status?: any;
  type?: any;
  return_date?: any;
  location?: any;
  detail?: any;
  side?: any;
  */
  updated_at: Date;
  created_at: Date;
}
