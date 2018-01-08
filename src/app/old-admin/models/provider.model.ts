/**
 * Created by Hiren on 27-07-2017.
 */


export interface Analyst {
  _id:string;
  created_at:Date;
  created_short_date:string;
  first_name:string;
  last_name:string;
  email:string;
  user_name:string;
  analyst_info:AnalystInfo;
  mobile:string;
  is_subscribe:boolean;
  is_memberspace:boolean;
  is_active:boolean;
  is_verified:boolean;
  role:string;
}

export interface AnalystInfo {
  subscription_fee?:any;
  biodata?:any;
}
