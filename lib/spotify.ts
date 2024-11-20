import { env } from "@/lib/env";

interface SpotifyShow {
  id: string;
  name: string;
  description: string;
  images: { url: string; height: number; width: number }[];
  publisher: string;
  total_episodes: number;
}

interface SpotifyEpisode {
  id: string;
  name: string;
  description: string;
  release_date: string;
  duration_ms: number;
  languages: string[];
  explicit: boolean;
  type: string;
}

class SpotifyAPI {
  private static instance: SpotifyAPI;
  private baseUrl = "https://api.spotify.com/v1";

  private constructor() {}

  static getInstance(): SpotifyAPI {
    if (!SpotifyAPI.instance) {
      SpotifyAPI.instance = new SpotifyAPI();
    }
    return SpotifyAPI.instance;
  }

  private async fetch(endpoint: string, accessToken: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getShows(accessToken: string): Promise<SpotifyShow[]> {
    const data = await this.fetch("/me/shows", accessToken);
    return data.items.map((item: any) => item.show);
  }

  async getShowAnalytics(showId: string): Promise<any> {
    // This would use the Spotify Analytics API endpoints
    // Note: This is a simplified example as the actual analytics endpoints
    // would depend on what's available in your Spotify API access level
    return {
      overview: {
        total_plays: 247500,
        unique_listeners: 185200,
        average_listen_duration: "42:18",
        completion_rate: 78,
      },
      demographics: {
        age_ranges: [
          { range: "18-22", percentage: 15 },
          { range: "23-27", percentage: 25 },
          { range: "28-34", percentage: 30 },
          { range: "35-44", percentage: 15 },
        ],
        gender: [
          { gender: "Male", percentage: 45 },
          { gender: "Female", percentage: 48 },
          { gender: "Non-binary", percentage: 5 },
        ],
        top_locations: [
          { country: "United States", listeners: 85000 },
          { country: "United Kingdom", listeners: 35000 },
          { country: "Canada", listeners: 25000 },
        ],
      },
      engagement: {
        average_completion: 82,
        skip_rate: 12,
        replay_rate: 8,
      },
    };
  }

  async getEpisodeAnalytics(episodeId: string): Promise<any> {
    // This would fetch detailed analytics for a specific episode
    return {
      plays: 12500,
      unique_listeners: 10800,
      average_listen_duration: "38:42",
      completion_rate: 85,
      demographics: {
        // Episode-specific demographic data
      },
      engagement: {
        // Episode-specific engagement metrics
      },
    };
  }
}

export const spotifyAPI = SpotifyAPI.getInstance();
export type { SpotifyShow, SpotifyEpisode };