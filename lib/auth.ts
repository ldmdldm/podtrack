"use client";

import { env } from "@/lib/env";

export interface SocialTokens {
  spotify?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
  instagram?: {
    accessToken: string;
    expiresAt: number;
  };
  tiktok?: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  };
}

class AuthManager {
  private static instance: AuthManager;
  private tokens: SocialTokens = {};

  private constructor() {}

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  setTokens(platform: keyof SocialTokens, tokens: any) {
    this.tokens[platform] = tokens;
  }

  async refreshSpotifyToken(): Promise<string> {
    if (!this.tokens.spotify) throw new Error("No Spotify tokens available");

    if (Date.now() < this.tokens.spotify.expiresAt) {
      return this.tokens.spotify.accessToken;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: this.tokens.spotify.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh Spotify token");
    }

    const data = await response.json();
    this.tokens.spotify = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token || this.tokens.spotify.refreshToken,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return this.tokens.spotify.accessToken;
  }

  async refreshInstagramToken(): Promise<string> {
    if (!this.tokens.instagram) throw new Error("No Instagram tokens available");

    if (Date.now() < this.tokens.instagram.expiresAt) {
      return this.tokens.instagram.accessToken;
    }

    const response = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${this.tokens.instagram.accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to refresh Instagram token");
    }

    const data = await response.json();
    this.tokens.instagram = {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return this.tokens.instagram.accessToken;
  }

  async refreshTikTokToken(): Promise<string> {
    if (!this.tokens.tiktok) throw new Error("No TikTok tokens available");

    if (Date.now() < this.tokens.tiktok.expiresAt) {
      return this.tokens.tiktok.accessToken;
    }

    const response = await fetch("https://open-api.tiktok.com/oauth/refresh_token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_key: env.TIKTOK_CLIENT_KEY,
        grant_type: "refresh_token",
        refresh_token: this.tokens.tiktok.refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh TikTok token");
    }

    const data = await response.json();
    this.tokens.tiktok = {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    return this.tokens.tiktok.accessToken;
  }
}

export const authManager = AuthManager.getInstance();