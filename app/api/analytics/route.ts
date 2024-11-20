import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get analytics data from all connected platforms
    const [spotifyData, instagramData, tiktokData] = await Promise.all([
      apiClient.getSpotifyPodcastAnalytics(session.user.id),
      apiClient.getInstagramAnalytics(session.user.id),
      apiClient.getTikTokAnalytics(session.user.id),
    ]);

    return NextResponse.json({
      spotify: spotifyData,
      instagram: instagramData,
      tiktok: tiktokData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}