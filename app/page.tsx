"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Advanced Podcast Analytics</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
        Get detailed insights into your podcast performance with comprehensive Spotify analytics
      </p>
      <Button 
        size="lg" 
        onClick={() => router.push(session ? "/analytics" : "/pricing")}
      >
        {session ? "View Analytics" : "Get Started"}
      </Button>
    </div>
  );
}