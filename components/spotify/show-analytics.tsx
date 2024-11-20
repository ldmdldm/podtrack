"use client";

import { useSpotifyAnalytics } from "@/hooks/use-spotify-data";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ShowAnalyticsProps {
  showId: string;
}

export function ShowAnalytics({ showId }: ShowAnalyticsProps) {
  const { data, isLoading } = useSpotifyAnalytics(showId);

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Show Performance</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.episodes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.substring(0, 15) + '...'}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="plays"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}