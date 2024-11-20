"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotify } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const sessionId = searchParams.get("session_id");

  const handleSpotifyLogin = async () => {
    await signIn("spotify", { 
      callbackUrl: `/connect?plan=${plan}&session_id=${sessionId}` 
    });
  };

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Connect Your Spotify Account</h1>
            <p className="text-muted-foreground">
              Sign in with Spotify to start analyzing your podcast performance
            </p>
          </div>

          <Button 
            className="w-full" 
            onClick={handleSpotifyLogin}
          >
            <Spotify className="mr-2 h-4 w-4" />
            Continue with Spotify
          </Button>
        </Card>
      </div>
    </div>
  );
}