import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { spotifyAPI } from "@/lib/spotify";

export async function GET(
  request: Request,
  { params }: { params: { showId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const analytics = await spotifyAPI.getShowAnalytics(params.showId);
    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Error fetching show analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch show analytics" },
      { status: 500 }
    );
  }
}