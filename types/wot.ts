export interface WotPlayerStats {
  wins: number;
  battles: number;
  draws: number;
}

export interface WotStrongholdBlock {
  battles: number;
  wins: number;
}

export interface WotStrongholdStats {
  battles: number;
  wins: number;
}

export interface WotPlayer {
  account_id: number;
  nickname: string;
}

export interface WotSearchResponse {
  status: string;
  meta: { count: number };
  data: WotPlayer[];
}

export interface WotStatsResponse {
  status: string;
  data: {
    [account_id: string]: {
      statistics: {
        all: WotPlayerStats;
        clan?: {
          battles: number;
          wins: number;
          draws: number;
        };
        stronghold_skirmish?: WotStrongholdBlock;
        stronghold_defense?: WotStrongholdBlock;
      };
    };
  };
}

export interface WotTank {
  tank_id: number;
  name: string;
  tier: number;
  images: {
    big_icon: string;
  };
}

export interface WotVehiclesResponse {
  status: string;
  data: {
    [tank_id: string]: WotTank;
  };
}

export interface WotPlayerTank {
  tank_id: number;
}

export interface WotPlayerTanksResponse {
  status: string;
  data: {
    [account_id: string]: WotPlayerTank[] | null;
  };
}

export interface PlayerTankWithInfo extends WotTank {
  selected: boolean;
}
