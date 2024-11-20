"use client";

import { useQuery } from "@tanstack/react-query";
import type { SpotifyShow, SpotifyEpisode, DetailedAnalytics } from "@/lib/spotify-api";

export function useShows() {
  return useQuery<SpotifyShow[]>({
    queryKey: ["spotify-shows"],
    queryFn: async () => {
      const response = await fetch("/api/spotify/shows");
      if (!response.ok) {
        throw new Error("Failed to fetch shows");
      }
      const data = await response.json();
      return data.shows;
    },
  });
}

export function useEpisodes(showId: string) {
  return useQuery<SpotifyEpisode[]>({
    queryKey: ["spotify-episodes", showId],
    queryFn: async () => {
      const response = await fetch(`/api/spotify/shows/${showId}/episodes`);
      if (!response.ok) {
        throw new Error("Failed to fetch episodes");
      }
      const data = await response.json();
      return data.episodes;
    },
    enabled: !!showId,
  });
}

export function useEpisodeAnalytics(episodeId: string) {
  return useQuery<DetailedAnalytics>({
    queryKey: ["spotify-episode-analytics", episodeId],
    queryFn: async () => {
      const response = await fetch(`/api/spotify/episodes/${episodeId}/analytics`);
      if (!response.ok) {
        throw new Error("Failed to fetch episode analytics");
      }
      const data = await response.json();
      return data.analytics;
    },
    enabled: !!episodeId,
  });
}