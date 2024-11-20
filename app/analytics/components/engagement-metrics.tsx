"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";

const engagementData = {
  retention: [
    { timestamp: "00:00", listeners: 100 },
    { timestamp: "05:00", listeners: 95 },
    { timestamp: "10:00", listeners: 92 },
    { timestamp: "15:00", listeners: 88 },
    { timestamp: "20:00", listeners: 85 },
    { timestamp: "25:00", listeners: 82 },
    { timestamp: "30:00", listeners: 80 },
  ],
  interactions: [
    { segment: "0-5min", plays: 1000, replays: 150, skips: 50 },
    { segment: "5-10min", plays: 950, replays: 200, skips: 75 },
    { segment: "10-15min", plays: 900, replays: 180, skips: 100 },
    { segment: "15-20min", plays: 850, replays: 160, skips: 120 },
    { segment: "20-25min", plays: 800, replays: 140, skips: 90 },
    { segment: "25-30min", plays: 750, replays: 120, skips: 80 },
  ],
  completionRates: [
    { episode: "EP 156", rate: 85 },
    { episode: "EP 155", rate: 82 },
    { episode: "EP 154", rate: 88 },
    { episode: "EP 153", rate: 79 },
    { episode: "EP 152", rate: 84 },
  ],
};

export function EngagementMetrics() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Listener Retention</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={engagementData.retention}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="listeners"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Segment Interactions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData.interactions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="segment" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="plays"
                stackId="1"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary)/0.2)"
              />
              <Area
                type="monotone"
                dataKey="replays"
                stackId="2"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1)/0.2)"
              />
              <Area
                type="monotone"
                dataKey="skips"
                stackId="3"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2)/0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Episode Completion Rates</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData.completionRates}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="episode" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="rate" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}