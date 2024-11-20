import { NextResponse } from "next/server";
import { spotifyAPI } from "@/lib/spotify";

export async function GET() {
  try {
    const shows = await spotifyAPI.fetchPodcastShows();
    return NextResponse.json({ shows });
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcasts" },
      { status: 500 }
    );
  }
}