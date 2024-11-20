"use client";

import { useQuery } from '@tanstack/react-query';
import { spotifyAPI } from '@/lib/spotify';

export function useSpotifyShows() {
  return useQuery({
    queryKey: ['spotify-shows'],
    queryFn: async () => {
      const response = await fetch('/api/spotify/shows');
      if (!response.ok) {
        throw new Error('Failed to fetch shows');
      }
      return response.json();
    },
  });
}

export function useSpotifyEpisodes(showId: string) {
  return useQuery({
    queryKey: ['spotify-episodes', showId],
    queryFn: async () => {
      const response = await fetch(`/api/spotify/shows/${showId}/episodes`);
      if (!response.ok) {
        throw new Error('Failed to fetch episodes');
      }
      return response.json();
    },
    enabled: !!showId,
  });
}

export function useSpotifyAnalytics(showId: string) {
  return useQuery({
    queryKey: ['spotify-analytics', showId],
    queryFn: async () => {
      const response = await fetch(`/api/spotify/shows/${showId}/analytics`);
      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }
      return response.json();
    },
    enabled: !!showId,
  });
}