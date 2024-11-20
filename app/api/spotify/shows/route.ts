import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { spotifyAPI } from "@/lib/spotify-api";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await spotifyAPI.setTokens({
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
      expiresAt: Date.now() + 3600 * 1000, // 1 hour from now
    });

    const shows = await spotifyAPI.getShows();
    return NextResponse.json({ shows });
  } catch (error) {
    console.error("Error fetching shows:", error);
    return NextResponse.json(
      { error: "Failed to fetch shows" },
      { status: 500 }
    );
  }
}