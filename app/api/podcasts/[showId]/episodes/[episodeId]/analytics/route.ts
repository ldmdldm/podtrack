import { NextResponse } from "next/server";
import { spotifyAPI } from "@/lib/spotify";

export async function GET(
  request: Request,
  { params }: { params: { episodeId: string } }
) {
  try {
    const analytics = await spotifyAPI.fetchEpisodeAnalytics(params.episodeId);
    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Error fetching episode analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch episode analytics" },
      { status: 500 }
    );
  }
}