import { NextResponse } from "next/server";
import { spotifyAPI } from "@/lib/spotify";

export async function GET(
  request: Request,
  { params }: { params: { showId: string } }
) {
  try {
    const episodes = await spotifyAPI.fetchPodcastEpisodes(params.showId);
    return NextResponse.json({ episodes });
  } catch (error) {
    console.error("Error fetching episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch episodes" },
      { status: 500 }
    );
  }
}