/**
 * Created by Hiren on 01-07-2017.
 */

export interface Lineup {
  _id:string;
  game_date:Date;
  game_id:string;
  sport:string;
  team_id:string;
  team_stats_global_id:number;
  team_sports_data_id:string;
  team_code:string;
  team_status:string;
  team_is_home:number;
  team_name:string;
  team_nickname:string;
  team_players:any[];
  team_lineups:any[];
  updated_at:Date;
  created_at:Date;
  __v:number;
  team_wikipedia_logo_url:string;
  team_wikipedia_word_mark_url:string;
  team_city:string;
}
