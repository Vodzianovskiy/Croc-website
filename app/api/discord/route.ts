import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

interface TankEntry {
  tank_id: number;
  name: string;
  selected: boolean;
}

// In-memory хранилище: IP → { count, resetAt }
const ipLimits = new Map<string, { count: number; resetAt: number }>();

const MAX_PER_DAY = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipLimits.get(ip);

  if (!entry || now > entry.resetAt) {
    ipLimits.set(ip, { count: 1, resetAt: now + DAY_MS });
    return true;
  }

  if (entry.count >= MAX_PER_DAY) return false;

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  // Получаем IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Лимит заявок: максимум 3 в день с одного IP" },
      { status: 429 },
    );
  }

  const body = await req.json();
  const { nickname, account_id, winRate, battles, tanks10, tanks8 } = body as {
    nickname: string;
    account_id: number;
    winRate: number;
    battles: number;
    tanks10: TankEntry[];
    tanks8: TankEntry[];
  };

  const selectedTanks10 = tanks10.filter((t) => t.selected);
  const selectedTanks8 = tanks8.filter((t) => t.selected);

  const embed = {
    title: `📋 Новая заявка в клан CR0C`,
    color: 0x00ff88,
    fields: [
      {
        name: "🎮 Игрок",
        value: `**${nickname}** (ID: ${account_id})`,
        inline: false,
      },
      {
        name: "📊 Статистика",
        value: `Побед: **${winRate}%**\nБоёв: **${battles.toLocaleString()}**`,
        inline: false,
      },
      {
        name: `🛡 Техника X уровня (${selectedTanks10.length})`,
        value:
          selectedTanks10.length > 0
            ? selectedTanks10.map((t) => `• ${t.name}`).join("\n")
            : "Не выбрано",
        inline: true,
      },
      {
        name: `🛡 Техника VIII уровня (${selectedTanks8.length})`,
        value:
          selectedTanks8.length > 0
            ? selectedTanks8.map((t) => `• ${t.name}`).join("\n")
            : "Не выбрано",
        inline: true,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: { text: `CR0C Clan Website • IP: ${ip}` },
  };

  try {
    await axios.post(WEBHOOK_URL!, { embeds: [embed] });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Discord error" }, { status: 500 });
  }
}
