import { NextRequest, NextResponse } from "next/server";
import { getClientCredentialsToken } from "@/lib/spotify";
import { generateDemoRecommendations } from "@/lib/recommend";
import { enrichRecommendationsWithSpotify } from "@/lib/enrich-recommendations";
import { Day } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const day = parseInt(searchParams.get("day") || "1") as Day;

  if (![1, 2, 3].includes(day)) {
    return NextResponse.json({ error: "Invalid day" }, { status: 400 });
  }

  let recommendations = generateDemoRecommendations(day);
  const clientToken = await getClientCredentialsToken();
  if (clientToken) {
    try {
      recommendations = await enrichRecommendationsWithSpotify(
        recommendations,
        clientToken
      );
    } catch (e) {
      console.warn("Spotify enrich (client credentials) failed:", e);
    }
  }

  return NextResponse.json({ day, recommendations });
}
