import { env } from '@/lib/env';

interface SpotifyTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface DetailedAnalytics {
  overview: {
    totalPlays: number;
    uniqueListeners: number;
    averageListenDuration: string;
    completionRate: number;
    peakListenerCount: number;
    totalStreamTime: number;
    listenerRetention: number;
    newListeners: number;
    returningListeners: number;
    shareRate: number;
    followsFromEpisode: number;
  };
  listenerBehavior: {
    minuteByMinute: Array<{
      minute: number;
      activeListeners: number;
      dropoffCount: number;
      replayCount: number;
      skipCount: number;
      speedChangeCount: number;
      averagePlaybackSpeed: number;
    }>;
    segments: Array<{
      startTime: number;
      endTime: number;
      listenerCount: number;
      dropoffRate: number;
      replayCount: number;
      engagement: number;
      annotations: string[];
    }>;
    skipPatterns: Array<{
      timestamp: number;
      skipCount: number;
      skipForward: number;
      skipBackward: number;
      context: string;
    }>;
  };
  demographics: {
    age: Array<{
      range: string;
      percentage: number;
      engagement: number;
      retention: number;
    }>;
    gender: Array<{
      type: string;
      percentage: number;
      engagement: number;
      retention: number;
    }>;
    location: Array<{
      country: string;
      region: string;
      city: string;
      listeners: number;
      engagement: number;
      growth: number;
    }>;
    platform: Array<{
      name: string;
      percentage: number;
      engagement: number;
      retention: number;
    }>;
    device: Array<{
      type: string;
      percentage: number;
      engagement: number;
      averageListenTime: number;
    }>;
  };
  engagement: {
    hourly: Array<{
      hour: number;
      listeners: number;
      engagement: number;
      peakConcurrent: number;
    }>;
    daily: Array<{
      date: string;
      listeners: number;
      uniqueListeners: number;
      averageListenTime: number;
      completionRate: number;
    }>;
    weekly: Array<{
      week: string;
      listeners: number;
      growth: number;
      retention: number;
      engagement: number;
    }>;
    monthly: Array<{
      month: string;
      listeners: number;
      growth: number;
      churnRate: number;
      reactivation: number;
    }>;
  };
  contentAnalysis: {
    topics: Array<{
      topic: string;
      duration: number;
      engagement: number;
      listenerRetention: number;
      sentiment: number;
    }>;
    segments: Array<{
      timestamp: number;
      duration: number;
      type: string;
      engagement: number;
      dropoff: number;
    }>;
    highlights: Array<{
      timestamp: number;
      duration: number;
      type: string;
      listenerCount: number;
      replayCount: number;
    }>;
  };
  technicalPerformance: {
    quality: Array<{
      bitrate: string;
      percentage: number;
      bufferingInstances: number;
      averageBufferDuration: number;
    }>;
    errors: Array<{
      type: string;
      count: number;
      affectedUsers: number;
      timestamp: string;
      resolution: string;
    }>;
    streaming: {
      averageBitrate: number;
      bufferingRatio: number;
      failedLoads: number;
      averageStartTime: number;
    };
  };
}

class SpotifyAPI {
  private static instance: SpotifyAPI;
  private baseUrl = 'https://api.spotify.com/v1';
  private tokens: SpotifyTokens | null = null;

  private constructor() {}

  static getInstance(): SpotifyAPI {
    if (!SpotifyAPI.instance) {
      SpotifyAPI.instance = new SpotifyAPI();
    }
    return SpotifyAPI.instance;
  }

  async setTokens(tokens: SpotifyTokens) {
    this.tokens = tokens;
  }

  private async refreshAccessToken(): Promise<string> {
    if (!this.tokens?.refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.tokens.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    this.tokens = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || this.tokens.refreshToken,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return this.tokens.accessToken;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.tokens) {
      throw new Error('No tokens available');
    }

    if (Date.now() >= this.tokens.expiresAt) {
      const newToken = await this.refreshAccessToken();
      this.tokens.accessToken = newToken;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.tokens.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getEpisodeAnalytics(episodeId: string): Promise<DetailedAnalytics> {
    // This would be replaced with actual Spotify Analytics API endpoints
    // For now, we'll return mock data that matches real-world patterns
    return {
      overview: {
        totalPlays: Math.floor(Math.random() * 100000),
        uniqueListeners: Math.floor(Math.random() * 80000),
        averageListenDuration: `${Math.floor(Math.random() * 45)}:${Math.floor(Math.random() * 60)}`,
        completionRate: Math.floor(Math.random() * 30) + 70,
        peakListenerCount: Math.floor(Math.random() * 5000),
        totalStreamTime: Math.floor(Math.random() * 1000000),
        listenerRetention: Math.floor(Math.random() * 20) + 80,
        newListeners: Math.floor(Math.random() * 1000),
        returningListeners: Math.floor(Math.random() * 5000),
        shareRate: Math.random() * 5,
        followsFromEpisode: Math.floor(Math.random() * 200),
      },
      listenerBehavior: {
        minuteByMinute: Array.from({ length: 60 }, (_, i) => ({
          minute: i,
          activeListeners: Math.floor(Math.random() * 1000) + 500,
          dropoffCount: Math.floor(Math.random() * 50),
          replayCount: Math.floor(Math.random() * 30),
          skipCount: Math.floor(Math.random() * 40),
          speedChangeCount: Math.floor(Math.random() * 20),
          averagePlaybackSpeed: 1 + (Math.random() * 0.5),
        })),
        segments: Array.from({ length: 10 }, (_, i) => ({
          startTime: i * 300,
          endTime: (i + 1) * 300,
          listenerCount: Math.floor(Math.random() * 1000) + 500,
          dropoffRate: Math.random() * 5,
          replayCount: Math.floor(Math.random() * 100),
          engagement: Math.random() * 100,
          annotations: ['Topic Change', 'Key Point', 'Sponsor Message'],
        })),
        skipPatterns: Array.from({ length: 20 }, (_, i) => ({
          timestamp: i * 60,
          skipCount: Math.floor(Math.random() * 100),
          skipForward: Math.floor(Math.random() * 60),
          skipBackward: Math.floor(Math.random() * 30),
          context: 'Content Segment',
        })),
      },
      demographics: {
        age: [
          { range: '18-24', percentage: 25, engagement: 85, retention: 78 },
          { range: '25-34', percentage: 35, engagement: 92, retention: 85 },
          { range: '35-44', percentage: 20, engagement: 88, retention: 82 },
          { range: '45-54', percentage: 15, engagement: 90, retention: 88 },
          { range: '55+', percentage: 5, engagement: 95, retention: 92 },
        ],
        gender: [
          { type: 'Male', percentage: 48, engagement: 87, retention: 82 },
          { type: 'Female', percentage: 45, engagement: 90, retention: 85 },
          { type: 'Non-binary', percentage: 5, engagement: 92, retention: 88 },
          { type: 'Other', percentage: 2, engagement: 88, retention: 84 },
        ],
        location: Array.from({ length: 10 }, (_, i) => ({
          country: `Country ${i + 1}`,
          region: `Region ${i + 1}`,
          city: `City ${i + 1}`,
          listeners: Math.floor(Math.random() * 10000),
          engagement: Math.random() * 100,
          growth: Math.random() * 20 - 10,
        })),
        platform: [
          { name: 'iOS', percentage: 45, engagement: 88, retention: 82 },
          { name: 'Android', percentage: 40, engagement: 85, retention: 80 },
          { name: 'Desktop', percentage: 10, engagement: 92, retention: 88 },
          { name: 'Web', percentage: 5, engagement: 80, retention: 75 },
        ],
        device: [
          { type: 'Smartphone', percentage: 70, engagement: 85, averageListenTime: 35 },
          { type: 'Tablet', percentage: 15, engagement: 90, averageListenTime: 42 },
          { type: 'Computer', percentage: 10, engagement: 95, averageListenTime: 48 },
          { type: 'Smart Speaker', percentage: 5, engagement: 88, averageListenTime: 38 },
        ],
      },
      engagement: {
        hourly: Array.from({ length: 24 }, (_, i) => ({
          hour: i,
          listeners: Math.floor(Math.random() * 1000) + 100,
          engagement: Math.random() * 100,
          peakConcurrent: Math.floor(Math.random() * 500),
        })),
        daily: Array.from({ length: 7 }, (_, i) => ({
          date: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
          listeners: Math.floor(Math.random() * 5000) + 1000,
          uniqueListeners: Math.floor(Math.random() * 4000) + 800,
          averageListenTime: Math.floor(Math.random() * 45) + 15,
          completionRate: Math.random() * 20 + 80,
        })),
        weekly: Array.from({ length: 4 }, (_, i) => ({
          week: `Week ${i + 1}`,
          listeners: Math.floor(Math.random() * 20000) + 5000,
          growth: Math.random() * 20 - 10,
          retention: Math.random() * 20 + 80,
          engagement: Math.random() * 100,
        })),
        monthly: Array.from({ length: 6 }, (_, i) => ({
          month: new Date(Date.now() - i * 30 * 86400000).toISOString().split('T')[0].substring(0, 7),
          listeners: Math.floor(Math.random() * 50000) + 10000,
          growth: Math.random() * 30 - 15,
          churnRate: Math.random() * 10,
          reactivation: Math.random() * 5,
        })),
      },
      contentAnalysis: {
        topics: Array.from({ length: 5 }, (_, i) => ({
          topic: `Topic ${i + 1}`,
          duration: Math.floor(Math.random() * 600) + 300,
          engagement: Math.random() * 100,
          listenerRetention: Math.random() * 20 + 80,
          sentiment: Math.random() * 2 - 1,
        })),
        segments: Array.from({ length: 8 }, (_, i) => ({
          timestamp: i * 300,
          duration: Math.floor(Math.random() * 300) + 100,
          type: ['Interview', 'Monologue', 'Discussion', 'Ad Break'][Math.floor(Math.random() * 4)],
          engagement: Math.random() * 100,
          dropoff: Math.random() * 10,
        })),
        highlights: Array.from({ length: 5 }, (_, i) => ({
          timestamp: i * 600,
          duration: Math.floor(Math.random() * 120) + 60,
          type: ['Key Point', 'Popular Segment', 'High Engagement'][Math.floor(Math.random() * 3)],
          listenerCount: Math.floor(Math.random() * 1000) + 500,
          replayCount: Math.floor(Math.random() * 200),
        })),
      },
      technicalPerformance: {
        quality: [
          { bitrate: '320kbps', percentage: 60, bufferingInstances: 12, averageBufferDuration: 1.2 },
          { bitrate: '160kbps', percentage: 30, bufferingInstances: 18, averageBufferDuration: 1.5 },
          { bitrate: '96kbps', percentage: 10, bufferingInstances: 25, averageBufferDuration: 1.8 },
        ],
        errors: Array.from({ length: 3 }, (_, i) => ({
          type: ['Connection Lost', 'Playback Error', 'Loading Failed'][i],
          count: Math.floor(Math.random() * 100),
          affectedUsers: Math.floor(Math.random() * 50),
          timestamp: new Date().toISOString(),
          resolution: 'Auto-resolved',
        })),
        streaming: {
          averageBitrate: 256,
          bufferingRatio: 0.02,
          failedLoads: Math.floor(Math.random() * 50),
          averageStartTime: 0.8,
        },
      },
    };
  }
}

export const spotifyAPI = SpotifyAPI.getInstance();