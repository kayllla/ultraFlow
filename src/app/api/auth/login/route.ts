import { NextRequest, NextResponse } from "next/server";
import { getOAuthAppOrigin, getSpotifyAuthUrl } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const origin = getOAuthAppOrigin(request);
  const url = getSpotifyAuthUrl(origin);
  return NextResponse.redirect(url);
}
