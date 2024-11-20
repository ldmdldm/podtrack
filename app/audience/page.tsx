"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, AreaChart, Area
} from "recharts";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { useState } from "react";
import { addDays } from "date-fns";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const audienceData = {
  demographics: {
    age: [
      { range: "13-17", percentage: 5 },
      { range: "18-24", percentage: 25 },
      { range: "25-34", percentage: 35 },
      { range: "35-44", percentage: 20 },
      { range: "45-54", percentage: 10 },
      { range: "55+", percentage: 5 },
    ],
    gender: [
      { type: "Male", percentage: 48 },
      { type: "Female", percentage: 45 },
      { type: "Non-binary", percentage: 5 },
      { type: "Other", percentage: 2 },
    ],
    languages: [
      { language: "English", users: 125000 },
      { language: "Spanish", users: 45000 },
      { language: "French", users: 25000 },
      { language: "German", users: 15000 },
      { language: "Portuguese", users: 12000 },
    ],
    education: [
      { level: "High School", percentage: 15 },
      { level: "Some College", percentage: 25 },
      { level: "Bachelor's", percentage: 35 },
      { level: "Master's", percentage: 20 },
      { level: "Doctorate", percentage: 5 },
    ],
  },
  engagement: {
    monthly: [
      { month: "Jan", listeners: 45000 },
      { month: "Feb", listeners: 48000 },
      { month: "Mar", listeners: 52000 },
      { month: "Apr", listeners: 55000 },
      { month: "May", listeners: 58000 },
      { month: "Jun", listeners: 62000 },
    ],
    retention: [
      { week: "Week 1", rate: 100 },
      { week: "Week 2", rate: 85 },
      { week: "Week 3", rate: 75 },
      { week: "Week 4", rate: 70 },
      { week: "Week 5", rate: 68 },
      { week: "Week 6", rate: 65 },
    ],
  },
  interests: [
    { category: "Technology", percentage: 35 },
    { category: "Business", percentage: 25 },
    { category: "Science", percentage: 20 },
    { category: "Arts", percentage: 15 },
    { category: "Sports", percentage: 5 },
  ],
  locations: {
    countries: [
      { name: "United States", listeners: 85000 },
      { name: "United Kingdom", listeners: 35000 },
      { name: "Canada", listeners: 25000 },
      { name: "Australia", listeners: 15000 },
      { name: "Germany", listeners: 10000 },
    ],
    cities: [
      { name: "New York", country: "US", listeners: 25000 },
      { name: "London", country: "UK", listeners: 20000 },
      { name: "Los Angeles", country: "US", listeners: 15000 },
      { name: "Toronto", country: "CA", listeners: 12000 },
      { name: "Sydney", country: "AU", listeners: 10000 },
    ],
  },
};

export default function AudiencePage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Audience Insights</h1>
          <p className="text-muted-foreground">
            Detailed analytics about your podcast listeners
          </p>
        </div>
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Episode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Episodes</SelectItem>
              <SelectItem value="latest">Latest Episode</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>
      </div>

      <Tabs defaultValue="demographics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics">
          <div className="grid grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData.demographics.age}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
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
                      data={audienceData.demographics.gender}
                      dataKey="percentage"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {audienceData.demographics.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Education Level</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData.demographics.education}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Language Preferences</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData.demographics.languages}>
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
        </TabsContent>

        <TabsContent value="engagement">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Monthly Listener Growth</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={audienceData.engagement.monthly}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="listeners"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary)/0.2)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Listener Retention Rate</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={audienceData.engagement.retention}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interests">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Interest Categories</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={audienceData.interests}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label
                  >
                    {audienceData.interests.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="locations">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={audienceData.locations.countries}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="listeners" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Cities</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {audienceData.locations.cities.map((city, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{city.name}</p>
                        <p className="text-sm text-muted-foreground">{city.country}</p>
                      </div>
                      <span className="font-medium">
                        {city.listeners.toLocaleString()} listeners
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}