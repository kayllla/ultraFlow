import { NextRequest, NextResponse } from "next/server";
import { exchangeCodeForToken, getOAuthAppOrigin } from "@/lib/spotify";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = getOAuthAppOrigin(request);
  const redirectUri = `${baseUrl}/api/auth/callback`;

  if (error || !code) {
    return NextResponse.redirect(
      `${baseUrl}/?error=${error || "no_code"}`
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(code, redirectUri);

    const response = NextResponse.redirect(`${baseUrl}/dashboard`);

    response.cookies.set("spotify_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: tokenData.expires_in,
      path: "/",
    });

    if (tokenData.refresh_token) {
      response.cookies.set("spotify_refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
    }

    return response;
  } catch (err) {
    console.error("Spotify auth error:", err);
    return NextResponse.redirect(`${baseUrl}/?error=auth_failed`);
  }
}
