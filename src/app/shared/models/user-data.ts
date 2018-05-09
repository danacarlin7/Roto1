export interface DraftKings {
    stackingTeams: any[];
    playerPerTeams: any[];
    positionFilter: any[];
    battingOrderFilter: any[];
    valueFilter: any[];
    salaryFilter: any[];
    projectionFilter: any[];
    mixMaxSalary: any[];
}

export interface FanDuel {
    stackingTeams: any[];
    playerPerTeams: any[];
    positionFilter: any[];
    battingOrderFilter: any[];
    valueFilter: any[];
    salaryFilter: any[];
    projectionFilter: any[];
    mixMaxSalary: any[];
}

export interface OptimizerSettingsNew {
    DraftKings: DraftKings;
    FanDuel: FanDuel;
}

export interface OptimizerSettings {
    stackingTeams: any[];
    playerPerTeams: any[];
    positionFilter: any[];
    battingOrderFilter: any[];
    valueFilter: any[];
    salaryFilter: any[];
    projectionFilter: any[];
    mixMaxSalary: any[];
}

export interface AnalystInfo {
    subscription_fee?: any;
    biodata?: any;
}

export class UserData{
  created_at: Date;
  created_short_date: string;
  first_name: string;
  last_name: string;
  email: string;
  user_name: string;
  optimizer_settings_new: OptimizerSettingsNew;
  optimizer_settings: OptimizerSettings;
  analyst_info: AnalystInfo;
  subscriptions: any[];
  mobile: string;
  is_partial_only: boolean;
  is_subscribe: boolean;
  is_memberspace: boolean;
  is_active: boolean;
  is_social: boolean;
  social_type: string;
  profile_image: string;
  role: string;
}
