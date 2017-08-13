/**
 * Created by Hiren on 12-08-2017.
 */


export interface AdvFilterValue {

  variability:number;
  numberOfUniquePlayers:number;
  mixMaxSalary:number[];
  numberOfLineups:number;
  maxExposure:number;
  noBatterVsPitchers:boolean;
  projectionFilter:number[];
  salaryFilter:number[];
  valueFilter:number[];
  battingOrderFilter:number[];
  playerPerTeams:{teamName:string,minPlayers:number,maxPlayers:number}[];
  stackingTeams:{name:string,players:number}[];

}
