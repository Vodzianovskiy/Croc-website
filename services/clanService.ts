import axios from "axios";
import {
  ClanTank,
  ClanTanksResponse,
  Provision,
  ProvisionsResponse,
  CrewSkill,
  ClanSearchResult,
  ClanInfo,
  ClanRating,
  ClanStrongholdInfo,
} from "@/types/clan";

const APP_ID = process.env.WOT_APP_ID;
const BASE_URL = "https://api.worldoftanks.eu/wot";

const CLAN_TANK_IDS = [
  7169, 9009, 5265, 22017, 3937, 9489, 58641, 6209, 19009, 4737, 7281, 57937,
  46849,
];

export async function getClanTanks(): Promise<ClanTank[]> {
  const res = await axios.get<ClanTanksResponse>(
    `${BASE_URL}/encyclopedia/vehicles/`,
    {
      params: {
        application_id: APP_ID,
        tank_id: CLAN_TANK_IDS.join(","),
        fields: "images.big_icon,short_name,crew",
      },
    },
  );

  if (res.data.status !== "ok") throw new Error("Clan tanks API error");

  return CLAN_TANK_IDS.map((id) => {
    const tank = res.data.data[String(id)];
    return {
      tank_id: id,
      short_name: tank.short_name,
      images: tank.images,
      crew: tank.crew ?? [],
    };
  }).filter(Boolean);
}

export async function getProvisions(): Promise<Provision[]> {
  const res = await axios.get<ProvisionsResponse>(
    `${BASE_URL}/encyclopedia/provisions/`,
    {
      params: {
        application_id: APP_ID,
        fields: "image,name,provision_id",
      },
    },
  );

  if (res.data.status !== "ok") throw new Error("Provisions API error");
  return Object.values(res.data.data).filter(Boolean);
}

interface CrewSkillsApiResponse {
  status: string;
  data: Record<string, CrewSkill>;
}

export async function getCrewSkills(): Promise<Record<string, CrewSkill>> {
  const res = await axios.get<CrewSkillsApiResponse>(
    `${BASE_URL}/encyclopedia/crewskills/`,
    {
      params: {
        application_id: APP_ID,
        fields: "name,skill,description,image_url",
      },
    },
  );

  if (res.data.status !== "ok") throw new Error("Crew skills API error");
  return res.data.data;
}

// ═══════════════════════════════════════════
// CLAN — SERVER (прямі запити, є APP_ID)
// Використовується в Server Components (app/clan/[id]/page.tsx)
// ═══════════════════════════════════════════

async function wotFetchServer<T>(
  endpoint: string,
  params: Record<string, string | number>,
): Promise<T> {
  const { data } = await axios.get(`${BASE_URL}/${endpoint}/`, {
    params: {
      application_id: APP_ID!,
      ...params,
    },
  });

  if (data.status !== "ok") {
    throw new Error(data.error?.message ?? "WG API error");
  }

  return data.data as T;
}

// ── Інфо про конкретний клан (Server) ──
export async function getClanInfo(clan_id: number): Promise<ClanInfo> {
  const data = await wotFetchServer<Record<string, ClanInfo>>("clans/info", {
    clan_id,
  });

  return data[String(clan_id)];
}

// ── Рейтинг клану (Server) ──
export async function getClanRating(
  clan_id: number,
): Promise<ClanRating | null> {
  try {
    const data = await wotFetchServer<Record<string, ClanRating>>(
      "clanratings/clans",
      {
        clan_id,
      },
    );

    return data?.[String(clan_id)] ?? null;
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════
// CLAN — CLIENT (через /api/wot проксі)
// Використовується в Client Components (app/clan/page.tsx)
// ═══════════════════════════════════════════

async function wotFetch<T>(
  endpoint: string,
  params: Record<string, string | number>,
): Promise<T> {
  const query = new URLSearchParams({
    endpoint,
    ...Object.fromEntries(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ),
  });

  const { data } = await axios.get(`/api/wot?${query.toString()}`);

  if (data.status !== "ok") {
    throw new Error(data.error?.message ?? "WG API error");
  }

  return data.data as T;
}

// ── Пошук кланів по тегу / назві (Client) ──
export async function searchClans(search: string): Promise<ClanSearchResult[]> {
  const data = await wotFetch<ClanSearchResult[]>("clans/list", {
    search,
    limit: 8,
    fields: "clan_id,tag,name,members_count,emblems",
  });

  return data ?? [];
}

// ── Сусіди в рейтингу (Client) ──
export async function getClanRatingNeighbors(
  clan_id: number,
  rank_field:
    | "gm_elo_rating_10"
    | "gm_elo_rating_8"
    | "gm_elo_rating_6" = "gm_elo_rating_10",
): Promise<ClanRating[]> {
  try {
    const data = await wotFetch<{ neighbors: ClanRating[] }>(
      "clanratings/neighbors",
      {
        clan_id,
        rank_field,
        limit: 5,
      },
    );

    return data?.neighbors ?? [];
  } catch {
    return [];
  }
}

export async function getClanStrongholdInfo(
  clan_id: number,
): Promise<ClanStrongholdInfo | null> {
  try {
    const data = await wotFetchServer<Record<string, ClanStrongholdInfo>>(
      "stronghold/claninfo",
      {
        clan_id,
      },
    );

    return data?.[String(clan_id)] ?? null;
  } catch {
    return null;
  }
}

export function getClanWgUrl(clanId: number) {
  return `https://eu.wargaming.net/clans/wot/${clanId}/`;
}
