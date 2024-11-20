"use client";

import { Card } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const demographicData = {
  ageRanges: [
    { age: "13-17", percentage: 5 },
    { age: "18-22", percentage: 15 },
    { age: "23-27", percentage: 25 },
    { age: "28-34", percentage: 30 },
    { age: "35-44", percentage: 15 },
    { age: "45-59", percentage: 7 },
    { age: "60+", percentage: 3 },
  ],
  gender: [
    { gender: "Male", percentage: 45 },
    { gender: "Female", percentage: 48 },
    { gender: "Non-binary", percentage: 5 },
    { gender: "Other", percentage: 2 },
  ],
  languages: [
    { language: "English", users: 125000 },
    { language: "Spanish", users: 45000 },
    { language: "French", users: 25000 },
    { language: "German", users: 15000 },
    { language: "Portuguese", users: 12000 },
  ],
  locations: [
    {
      country: "United States",
      listeners: 95000,
      cities: [
        { name: "New York", listeners: 25000 },
        { name: "Los Angeles", listeners: 18000 },
        { name: "Chicago", listeners: 12000 },
        { name: "Houston", listeners: 8000 },
        { name: "Phoenix", listeners: 6000 },
      ],
    },
    { country: "United Kingdom", listeners: 35000 },
    { country: "Canada", listeners: 25000 },
    { country: "Australia", listeners: 15000 },
    { country: "Germany", listeners: 10000 },
  ],
};

export function ListenerDemographics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demographicData.ageRanges}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData.gender}
                  dataKey="percentage"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {demographicData.gender.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cities">Top Cities</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={demographicData.locations}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="listeners" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="cities">
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {demographicData.locations[0].cities.map((city) => (
                  <div
                    key={city.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <span className="font-medium">{city.name}</span>
                    <span className="text-muted-foreground">
                      {city.listeners.toLocaleString()} listeners
                    </span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Language Preferences</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demographicData.languages}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="language" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}