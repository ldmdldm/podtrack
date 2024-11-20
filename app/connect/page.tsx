"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spotify, Instagram, Radio } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";

export default function ConnectPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSpotifyConnect = async () => {
    try {
      await signIn("spotify", { callbackUrl: "/analytics" });
    } catch (error) {
      toast.error("Failed to connect Spotify");
    }
  };

  const handleInstagramConnect = async () => {
    try {
      // Instagram OAuth flow would be implemented here
      toast.success("Instagram connected successfully");
      router.push("/analytics");
    } catch (error) {
      toast.error("Failed to connect Instagram");
    }
  };

  const handleTikTokConnect = async () => {
    try {
      // TikTok OAuth flow would be implemented here
      toast.success("TikTok connected successfully");
      router.push("/analytics");
    } catch (error) {
      toast.error("Failed to connect TikTok");
    }
  };

  return (
    <div className="container mx-auto py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Connect Your Platforms</h1>
          <p className="text-muted-foreground">
            Connect your social media accounts to start receiving comprehensive analytics
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#1DB954]/10 rounded-full">
                  <Spotify className="w-6 h-6 text-[#1DB954]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Spotify</h2>
                  <p className="text-sm text-muted-foreground">
                    Connect your podcast analytics
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleSpotifyConnect}
                variant={session?.accessToken ? "outline" : "default"}
              >
                {session?.accessToken ? "Connected" : "Connect"}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#E4405F]/10 rounded-full">
                  <Instagram className="w-6 h-6 text-[#E4405F]" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Instagram</h2>
                  <p className="text-sm text-muted-foreground">
                    Track cross-platform engagement
                  </p>
                </div>
              </div>
              <Button onClick={handleInstagramConnect}>Connect</Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#000000]/10 rounded-full">
                  <Radio className="w-6 h-6 text-black dark:text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">TikTok</h2>
                  <p className="text-sm text-muted-foreground">
                    Monitor social media performance
                  </p>
                </div>
              </div>
              <Button onClick={handleTikTokConnect}>Connect</Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Need help connecting your accounts? Check out our{" "}
            <a href="#" className="text-primary hover:underline">
              setup guide
            </a>{" "}
            or{" "}
            <a href="#" className="text-primary hover:underline">
              contact support
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}