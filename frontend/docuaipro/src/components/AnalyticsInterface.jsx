"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  FileText,
  Activity,
  Download,
  Calendar,
} from "lucide-react";

// Sample data for charts
const documentTrendsData = [
  { month: "Jan", processed: 1200, successful: 1150, failed: 50 },
  { month: "Feb", processed: 1400, successful: 1320, failed: 80 },
  { month: "Mar", processed: 1800, successful: 1710, failed: 90 },
  { month: "Apr", processed: 2200, successful: 2090, failed: 110 },
  { month: "May", processed: 2600, successful: 2470, failed: 130 },
  { month: "Jun", processed: 3000, successful: 2850, failed: 150 },
];

const userActivityData = [
  { day: "Mon", activeUsers: 450, newUsers: 25, returningUsers: 425 },
  { day: "Tue", activeUsers: 520, newUsers: 35, returningUsers: 485 },
  { day: "Wed", activeUsers: 480, newUsers: 20, returningUsers: 460 },
  { day: "Thu", activeUsers: 600, newUsers: 45, returningUsers: 555 },
  { day: "Fri", activeUsers: 750, newUsers: 60, returningUsers: 690 },
  { day: "Sat", activeUsers: 320, newUsers: 15, returningUsers: 305 },
  { day: "Sun", activeUsers: 280, newUsers: 10, returningUsers: 270 },
];

const apiUsageData = [
  { name: "Document Processing", value: 45, color: "var(--chart-1)" },
  { name: "Text Extraction", value: 25, color: "var(--chart-2)" },
  { name: "AI Analysis", value: 20, color: "var(--chart-3)" },
  { name: "Export Functions", value: 10, color: "var(--chart-4)" },
];

const performanceData = [
  { time: "00:00", responseTime: 120, throughput: 85 },
  { time: "04:00", responseTime: 110, throughput: 90 },
  { time: "08:00", responseTime: 180, throughput: 75 },
  { time: "12:00", responseTime: 220, throughput: 65 },
  { time: "16:00", responseTime: 200, throughput: 70 },
  { time: "20:00", responseTime: 150, throughput: 80 },
];

export default function AnalyticsInterface() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-sans">
              Analytics Dashboard
            </h1>
            <p className="text-muted-foreground font-mono">
              Track your DocuAI Pro performance and user activity
            </p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground font-mono">
                Total Documents
              </CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary font-sans">
                12,847
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground font-mono">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary font-sans">
                2,847
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+8.2%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground font-mono">
                Success Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary font-sans">
                94.8%
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+2.1%</span> improvement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground font-mono">
                Avg Response Time
              </CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary font-sans">
                1.2s
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-destructive">+0.1s</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Document Processing Trends */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">
                Document Processing Trends
              </CardTitle>
              <CardDescription className="font-mono">
                Monthly processing volume and success rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={documentTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="processed"
                    stackId="1"
                    stroke="var(--chart-1)"
                    fill="var(--chart-1)"
                    fillOpacity={0.6}
                    name="Total Processed"
                  />
                  <Area
                    type="monotone"
                    dataKey="successful"
                    stackId="2"
                    stroke="var(--chart-2)"
                    fill="var(--chart-2)"
                    fillOpacity={0.6}
                    name="Successful"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">
                User Activity
              </CardTitle>
              <CardDescription className="font-mono">
                Daily active users breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="newUsers"
                    fill="var(--chart-2)"
                    name="New Users"
                  />
                  <Bar
                    dataKey="returningUsers"
                    fill="var(--chart-1)"
                    name="Returning Users"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* API Usage Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">
                API Usage Distribution
              </CardTitle>
              <CardDescription className="font-mono">
                Breakdown of API endpoint usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={apiUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {apiUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground font-sans">
                Performance Metrics
              </CardTitle>
              <CardDescription className="font-mono">
                Response time and throughput over 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="time" stroke="var(--muted-foreground)" />
                  <YAxis stroke="var(--muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    stroke="var(--chart-3)"
                    strokeWidth={2}
                    name="Response Time (ms)"
                  />
                  <Line
                    type="monotone"
                    dataKey="throughput"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    name="Throughput (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground font-sans">
              Recent Activity
            </CardTitle>
            <CardDescription className="font-mono">
              Latest user actions and system events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: "john.doe@company.com",
                  action: "Processed document",
                  document: "contract_v2.pdf",
                  time: "2 minutes ago",
                  status: "success",
                },
                {
                  user: "sarah.smith@company.com",
                  action: "Failed processing",
                  document: "invoice_scan.pdf",
                  time: "5 minutes ago",
                  status: "error",
                },
                {
                  user: "mike.johnson@company.com",
                  action: "Exported results",
                  document: "report_final.pdf",
                  time: "8 minutes ago",
                  status: "success",
                },
                {
                  user: "lisa.brown@company.com",
                  action: "Started processing",
                  document: "presentation.pdf",
                  time: "12 minutes ago",
                  status: "processing",
                },
                {
                  user: "david.wilson@company.com",
                  action: "Processed document",
                  document: "manual_v3.pdf",
                  time: "15 minutes ago",
                  status: "success",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="font-medium text-card-foreground font-mono">
                        {activity.user}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action} • {activity.document}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "error"
                          ? "destructive"
                          : "secondary"
                      }
                      className="font-mono"
                    >
                      {activity.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground font-mono">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
