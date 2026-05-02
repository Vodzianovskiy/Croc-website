import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const skill = req.nextUrl.searchParams.get("skill");
  if (!skill) return new Response("Missing skill", { status: 400 });

  const url = `http://api.worldoftanks.eu/static/2.77.0/wot/encyclopedia/tankmen/skills/big/${skill}.png`;

  try {
    const res = await fetch(url);
    if (!res.ok) return new Response("Not found", { status: 404 });
    const buffer = await res.arrayBuffer();
    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return new Response("Error", { status: 500 });
  }
}
