"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Crown,
  Calendar,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function DashboardContent({ activeItem }) {
  const { user } = useAuth();
  console.log(user, "user");
  if (activeItem === "dashboard") {
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="space-y-2">
          <h1 className="font-playfair text-3xl font-bold text-foreground">
            Welcome back, {user?.full_name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your documents today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents Processed
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Processing Time
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.5s</span> avg improvement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+0.3%</span> this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Credits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,750</div>
              <p className="text-xs text-muted-foreground">
                1,250 remaining this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Subscription & Activity Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-accent" />
                Subscription Details
              </CardTitle>
              <CardDescription>
                Manage your DocuAI Pro subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Current Plan</span>
                <Badge
                  variant="secondary"
                  className="bg-accent text-accent-foreground"
                >
                  Pro Plan
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Credits Used</span>
                  <span>1,250 / 10,000</span>
                </div>
                <Progress value={12.5} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Next Billing Date</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Jan 15, 2025
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>Monthly Cost</span>
                <span className="font-medium">$49.99</span>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest document processing activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Document processed",
                    file: "contract_v2.pdf",
                    time: "2 minutes ago",
                    status: "success",
                  },
                  {
                    action: "Batch upload completed",
                    file: "invoices_batch_01.zip",
                    time: "15 minutes ago",
                    status: "success",
                  },
                  {
                    action: "Processing failed",
                    file: "corrupted_file.pdf",
                    time: "1 hour ago",
                    status: "error",
                  },
                  {
                    action: "Document extracted",
                    file: "financial_report.xlsx",
                    time: "2 hours ago",
                    status: "success",
                  },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.file}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>

              <Button variant="ghost" className="w-full mt-4">
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
