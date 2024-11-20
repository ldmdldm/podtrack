import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { spotifyAPI } from "@/lib/spotify-api";

export async function GET(
  request: Request,
  { params }: { params: { showId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await spotifyAPI.setTokens({
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
      expiresAt: Date.now() + 3600 * 1000,
    });

    const episodes = await spotifyAPI.getShowEpisodes(params.showId);
    return NextResponse.json({ episodes });
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 }
    );
  }
}