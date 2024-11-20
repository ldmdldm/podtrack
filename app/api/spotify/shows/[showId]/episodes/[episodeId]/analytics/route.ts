import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { spotifyAPI } from "@/lib/spotify-api";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(
  request: Request,
  { params }: { params: { showId: string; episodeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check rate limits based on subscription tier
    const rateLimitResult = await rateLimit.check(session.user.id);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Rate limit exceeded", 
          message: "Please upgrade your plan for more data points",
          currentUsage: rateLimitResult.currentUsage,
          limit: rateLimitResult.limit
        }, 
        { status: 429 }
      );
    }

    await spotifyAPI.setTokens({
      accessToken: session.accessToken as string,
      refreshToken: session.refreshToken as string,
      expiresAt: Date.now() + 3600 * 1000,
    });

    const analytics = await spotifyAPI.getEpisodeAnalytics(params.episodeId);

    // Track data point usage
    await rateLimit.increment(session.user.id, analytics.dataPoints);

    return NextResponse.json({ analytics });
  } catch (error) {
    console.error("Error fetching episode analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch episode analytics" },
      { status: 500 }
    );
  }
}