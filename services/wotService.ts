import axios from "axios";
import {
  WotSearchResponse,
  WotPlayer,
  WotStatsResponse,
  WotPlayerStats,
  WotStrongholdStats,
  WotVehiclesResponse,
  WotTank,
  WotPlayerTanksResponse,
  WotPlayerTank,
} from "@/types/wot";

const API = "/api/wot";

export async function searchPlayer(nickname: string): Promise<WotPlayer[]> {
  const res = await axios.get<WotSearchResponse>(API, {
    params: {
      endpoint: "account/list",
      search: nickname,
      fields: "account_id,nickname",
    },
  });

  if (res.data.status !== "ok") {
    throw new Error("WoT API error");
  }

  return res.data.data;
}

export async function getPlayerStats(
  account_id: number,
): Promise<WotPlayerStats> {
  const res = await axios.get<WotStatsResponse>(API, {
    params: {
      endpoint: "account/info",
      account_id,
      fields: "statistics.all.battles,statistics.all.wins,statistics.all.draws",
    },
  });

  if (res.data.status !== "ok") {
    throw new Error("Stats API error");
  }

  const playerData = res.data.data[String(account_id)];
  if (!playerData) {
    throw new Error("Player data not found");
  }

  return playerData.statistics.all;
}

export async function getPlayerStrongholdStats(
  account_id: number,
): Promise<WotStrongholdStats> {
  const res = await axios.get<WotStatsResponse>(API, {
    params: {
      endpoint: "account/info",
      account_id,
      fields:
        "statistics.stronghold_skirmish.battles,statistics.stronghold_skirmish.wins,statistics.stronghold_defense.battles,statistics.stronghold_defense.wins",
    },
  });

  if (res.data.status !== "ok") {
    throw new Error("Stronghold stats API error");
  }

  const playerData = res.data.data[String(account_id)];
  if (!playerData) {
    throw new Error("Player data not found");
  }

  const skirmish = playerData.statistics.stronghold_skirmish ?? {
    battles: 0,
    wins: 0,
  };

  const defense = playerData.statistics.stronghold_defense ?? {
    battles: 0,
    wins: 0,
  };

  return {
    battles: (skirmish.battles ?? 0) + (defense.battles ?? 0),
    wins: (skirmish.wins ?? 0) + (defense.wins ?? 0),
  };
}

export async function getPlayerTanks(
  account_id: number,
): Promise<WotPlayerTank[]> {
  const res = await axios.get<WotPlayerTanksResponse>(API, {
    params: {
      endpoint: "tanks/stats",
      account_id,
      fields: "tank_id",
    },
  });

  if (res.data.status !== "ok") {
    throw new Error("Tanks API error");
  }

  return res.data.data[String(account_id)] ?? [];
}

export async function getTanksByTier(
  tankIds: number[],
  tier: number,
): Promise<WotTank[]> {
  if (tankIds.length === 0) return [];

  const BATCH = 100;
  const results: WotTank[] = [];

  for (let i = 0; i < tankIds.length; i += BATCH) {
    const batch = tankIds.slice(i, i + BATCH);

    const res = await axios.get<WotVehiclesResponse>(API, {
      params: {
        endpoint: "encyclopedia/vehicles",
        tank_id: batch.join(","),
        fields: "tank_id,name,images.big_icon,tier",
      },
    });

    if (res.data.status !== "ok") continue;

    const filtered = Object.values(res.data.data).filter(
      (tank) => tank && tank.tier === tier,
    );

    results.push(...filtered);
  }

  return results;
}

// provisions
export async function getProvisions(provisionIds: number[]) {
  if (provisionIds.length === 0) return {};

  const ids = provisionIds.join(",");

  const res = await fetch(
    `https://api.worldoftanks.eu/wot/encyclopedia/provisions/?application_id=${process.env.NEXT_PUBLIC_WOT_APP_ID}&fields=image,name&provision_id=${ids}`,
  );

  const data = await res.json();

  return data.data as Record<number, { name: string; image: string }>;
}
