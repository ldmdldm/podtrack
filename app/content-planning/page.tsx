"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Brain, Calendar as CalendarIcon, TrendingUp, Target } from "lucide-react";

const trendingTopics = [
  { topic: "AI & Technology", growth: 85, volume: 12500 },
  { topic: "Mental Health", growth: 72, volume: 9800 },
  { topic: "Remote Work", growth: 65, volume: 8900 },
  { topic: "Sustainability", growth: 58, volume: 7600 },
  { topic: "Financial Literacy", growth: 52, volume: 6800 }
];

const bestTimes = [
  { day: "Monday", hour: "8:00 AM", engagement: 85 },
  { day: "Tuesday", hour: "7:00 AM", engagement: 82 },
  { day: "Wednesday", hour: "8:30 AM", engagement: 88 },
  { day: "Thursday", hour: "7:30 AM", engagement: 86 },
  { day: "Friday", hour: "9:00 AM", engagement: 80 }
];

export default function ContentPlanningPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Content Planning</h1>
          <p className="text-muted-foreground">
            Plan and optimize your podcast content strategy
          </p>
        </div>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" /> Schedule Episode
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Topic Suggestions</h2>
          </div>
          <ScrollArea className="h-[300px]">
            {trendingTopics.map((topic, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg mb-3"
              >
                <div>
                  <h3 className="font-medium">{topic.topic}</h3>
                  <p className="text-sm text-muted-foreground">
                    {topic.volume.toLocaleString()} monthly searches
                  </p>
                </div>
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {topic.growth}%
                </div>
              </div>
            ))}
          </ScrollArea>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Target className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Optimal Release Times</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bestTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="calendar">
          <TabsList>
            <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
            <TabsTrigger value="performance">Performance Predictions</TabsTrigger>
            <TabsTrigger value="ab-testing">A/B Testing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Calendar mode="single" className="rounded-md border" />
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Upcoming Episodes</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">Episode Title #{i + 1}</p>
                        <p className="text-sm text-muted-foreground">
                          Scheduled for {new Date().toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trendingTopics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="ab-testing">
            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                {[1, 2].map((version) => (
                  <Card key={version} className="p-4">
                    <h3 className="font-semibold mb-4">Version {version}</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <input
                          type="text"
                          className="w-full mt-1 p-2 border rounded-md"
                          placeholder={`Test Title ${version}`}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                          className="w-full mt-1 p-2 border rounded-md"
                          rows={3}
                          placeholder={`Test Description ${version}`}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button className="w-full">Start A/B Test</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}