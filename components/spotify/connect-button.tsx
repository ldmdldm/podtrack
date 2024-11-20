"use client";

import { Button } from "@/components/ui/button";
import { Spotify } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSpotifyAuth } from "@/hooks/use-spotify-auth";

export function SpotifyConnectButton() {
  const { isAuthenticated, isLoading } = useSpotifyAuth();

  const handleConnect = async () => {
    await signIn("spotify", { callbackUrl: "/analytics" });
  };

  if (isLoading) {
    return (
      <Button disabled>
        <Spotify className="mr-2 h-4 w-4" />
        Loading...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button variant="outline" disabled>
        <Spotify className="mr-2 h-4 w-4" />
        Connected
      </Button>
    );
  }

  return (
    <Button onClick={handleConnect}>
      <Spotify className="mr-2 h-4 w-4" />
      Connect Spotify
    </Button>
  );
}