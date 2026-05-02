import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const APP_ID = process.env.WOT_APP_ID;
const BASE_URL = "https://api.worldoftanks.eu/wot";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json({ error: "No endpoint" }, { status: 400 });
  }

  // Собираем все params кроме endpoint
  const params: Record<string, string> = { application_id: APP_ID! };

  searchParams.forEach((value, key) => {
    if (key !== "endpoint") {
      params[key] = value;
    }
  });

  try {
    const res = await axios.get(`${BASE_URL}/${endpoint}/`, {
      params,
      // Не трогаем значения — передаём как есть
      paramsSerializer: (p) =>
        Object.entries(p)
          .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
          .join("&"),
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ error: "WoT API error" }, { status: 500 });
  }
}
