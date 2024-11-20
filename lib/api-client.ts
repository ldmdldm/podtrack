import { authManager } from "./auth";

class APIClient {
  private static instance: APIClient;

  private constructor() {}

  static getInstance(): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient();
    }
    return APIClient.instance;
  }

  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getSpotifyPodcastAnalytics(podcastId: string) {
    const token = await authManager.refreshSpotifyToken();
    return this.fetchWithAuth(
      `https://api.spotify.com/v1/shows/${podcastId}/episodes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async getInstagramAnalytics(mediaId: string) {
    const token = await authManager.refreshInstagramToken();
    return this.fetchWithAuth(
      `https://graph.instagram.com/${mediaId}/insights?metric=impressions,reach,engagement`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async getTikTokAnalytics(videoId: string) {
    const token = await authManager.refreshTikTokToken();
    return this.fetchWithAuth(
      `https://open-api.tiktok.com/video/query/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          video_id: videoId,
        }),
      }
    );
  }
}

export const apiClient = APIClient.getInstance();