"use client";

import { useShows, useEpisodes } from "@/hooks/use-spotify";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function EpisodesPage() {
  const [selectedShowId, setSelectedShowId] = useState<string>("");
  const { data: showsData, isLoading: isLoadingShows } = useShows();
  const { data: episodesData, isLoading: isLoadingEpisodes } = useEpisodes(selectedShowId);

  if (isLoadingShows) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Episodes</h1>
      
      <div className="grid gap-6">
        {showsData?.shows.map((show) => (
          <Card key={show.id} className="p-6">
            <div className="flex items-start gap-4">
              {show.images[0] && (
                <img
                  src={show.images[0].url}
                  alt={show.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{show.name}</h2>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {show.description}
                </p>
                <div className="text-sm text-muted-foreground">
                  {show.total_episodes} episodes • {show.publisher}
                </div>
              </div>
            </div>

            {selectedShowId === show.id && !isLoadingEpisodes && (
              <div className="mt-6 grid gap-4">
                {episodesData?.episodes.map((episode) => (
                  <div
                    key={episode.id}
                    className="border rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{episode.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {episode.description}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(episode.release_date), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              className="mt-4 text-sm font-medium text-primary hover:underline"
              onClick={() => setSelectedShowId(selectedShowId === show.id ? "" : show.id)}
            >
              {selectedShowId === show.id ? "Hide episodes" : "Show episodes"}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}