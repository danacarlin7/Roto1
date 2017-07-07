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
  player_image:string;
}


export interface OptimizerPlayer{
  _id: string;
  TeamID: number;
  PlayerID: number;
  Name: string;
  Team: string;
  Position: string;
  PositionCategory: string;
  FanDuelSalary?: number;
  DraftKingsSalary?: number;
  FantasyDataSalary?: number;
  InjuryStatus: string;
  InjuryBodyPart: string;
  InjuryNotes: string;
  OpponentID: number;
  Opponent: string;
  FantasyPointsFanDuel: number;
  FantasyPointsDraftKings: number;
  FanduelValue: string;
  DraftKingsValue: string;
  FirstName: string;
  LastName: string;
  vsPitcher: string;
  OverUnder: string;
  Line: string;
  Runs: string;
  BattingOrder?: number;
}
