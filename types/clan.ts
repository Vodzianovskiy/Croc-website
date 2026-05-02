export interface ClanTank {
  tank_id: number;
  short_name: string;
  images: {
    big_icon: string;
  };
  crew: CrewMemberInfo[];
}

export interface CrewMemberInfo {
  member_id: string;
  roles: Record<string, number>;
}

export interface ClanTanksResponse {
  status: string;
  data: {
    [tank_id: string]: ClanTank;
  };
}

export interface ClanStat {
  num: string;
  label: string;
}

export interface Provision {
  provision_id: number;
  name: string;
  image: string;
}

export interface ProvisionsResponse {
  status: string;
  data: {
    [id: string]: Provision;
  };
}

export interface CrewSkill {
  skill: string;
  name: string;
  description: string;
  image_url: {
    big_icon: string;
    small_icon: string;
  };
}

export interface ClanEmblem {
  x32: { portal: string };
  x64: { portal: string; wot: string };
  x195: { portal: string };
  x256: { wowp: string };
}

export interface ClanSearchResult {
  clan_id: number;
  tag: string;
  name: string;
  members_count: number;
  emblems: ClanEmblem;
}

export interface ClanMember {
  account_id: number;
  account_name: string;
  role: string;
  role_i18n: string;
  joined_at: number;
}

export interface ClanInfo {
  clan_id: number;
  tag: string;
  name: string;
  motto: string;
  description: string;
  members_count: number;
  leader_name: string;
  color: string;
  emblems: ClanEmblem;
  accepts_join_requests: boolean;
  created_at: number;
  members: Record<string, ClanMember>;
}

export interface RatingField {
  rank: number | null;
  rank_delta: number | null;
  value: number;
}

export interface ClanRating {
  clan_id: number;
  clan_tag: string;
  clan_name: string;

  gm_elo_rating_10?: RatingField;
  gm_elo_rating_8?: RatingField;
  gm_elo_rating_6?: RatingField;

  fb_elo_rating_10?: RatingField;
  fb_elo_rating_8?: RatingField;
  fb_elo_rating_6?: RatingField;

  efficiency?: RatingField;
  wins_ratio_avg?: RatingField;
  battles_count_avg?: RatingField;
}

export interface StrongholdBuildingSlot {
  direction: string;
  arena_id: string;
  reserve_title: string;
  building_level: number;
  position: string;
  building_title: string;
}

export interface SkirmishStatistics {
  total_6: number;
  total_8: number;
  total_10: number;

  win_6: number;
  win_8: number;
  win_10: number;

  lose_6: number;
  lose_8: number;
  lose_10: number;

  last_time_6: number;
  last_time_8: number;
  last_time_10: number;
}

export interface ClanStrongholdInfo {
  clan_id: number;
  clan_tag: string;
  clan_name: string;
  stronghold_level: number;
  stronghold_buildings_level: number;
  building_slots: StrongholdBuildingSlot[];
  skirmish_statistics: SkirmishStatistics;
}
