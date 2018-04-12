/**
 * Created by Hiren on 28-06-2017.
 */


export const NewsTabConstants = {
  MLB: "MLB",
  MMA: "MMA",
  NASCAR: "NASCAR",
  NBA: "NBA",
  NFL: "NFL",
  NHL: "NHL",
  PGA: "PGA",
  SOCCER: "SOCCER",

};

export const NewsTabs: {value: string, label: string}[] = [
  {value: NewsTabConstants.MMA, label: "MMA"},
  {value: NewsTabConstants.MLB, label: "MLB"},
  {value: NewsTabConstants.NBA, label: "NBA"},
  {value: NewsTabConstants.NFL, label: "NFL"},
  {value: NewsTabConstants.NHL, label: "NHL"},
  {value: NewsTabConstants.PGA, label: "PGA"},
  {value: NewsTabConstants.NASCAR, label: "NASCAR"},
  {value: NewsTabConstants.SOCCER, label: "SOCCER"}
];
