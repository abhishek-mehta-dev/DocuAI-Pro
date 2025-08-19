"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  FileText,
  Upload,
  Download,
  User,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Activity,
} from "lucide-react";

const ActivityInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock activity data
  const activities = [
    {
      id: 1,
      type: "document",
      action: "Document Processed",
      description: "Annual Report 2024.pdf successfully processed",
      timestamp: "2024-01-15 14:30:00",
      status: "success",
      icon: FileText,
      details: "Pages: 45, Processing time: 2.3s",
    },
    {
      id: 2,
      type: "upload",
      action: "File Uploaded",
      description: "Contract_Template.pdf uploaded to workspace",
      timestamp: "2024-01-15 13:45:00",
      status: "success",
      icon: Upload,
      details: "Size: 2.4 MB",
    },
    {
      id: 3,
      type: "user",
      action: "Profile Updated",
      description: "User profile information updated",
      timestamp: "2024-01-15 12:15:00",
      status: "success",
      icon: User,
      details: "Email and notification preferences changed",
    },
    {
      id: 4,
      type: "system",
      action: "API Limit Warning",
      description: "Approaching monthly API usage limit",
      timestamp: "2024-01-15 11:00:00",
      status: "warning",
      icon: Bell,
      details: "85% of monthly quota used",
    },
    {
      id: 5,
      type: "document",
      action: "Processing Failed",
      description: "Unable to process corrupted_file.pdf",
      timestamp: "2024-01-15 10:30:00",
      status: "error",
      icon: XCircle,
      details: "Error: File format not supported",
    },
    {
      id: 6,
      type: "download",
      action: "Export Completed",
      description: "Monthly activity report exported",
      timestamp: "2024-01-15 09:15:00",
      status: "success",
      icon: Download,
      details: "Format: CSV, Records: 1,247",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return CheckCircle;
      case "warning":
        return Clock;
      case "error":
        return XCircle;
      default:
        return Activity;
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || activity.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Activity History
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your document processing and system activities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Today's Activities
                </p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Activity className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Documents Processed
                </p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <FileText className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold text-foreground">98.5%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Alerts</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <Bell className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Types</option>
                <option value="document">Documents</option>
                <option value="upload">Uploads</option>
                <option value="user">User Actions</option>
                <option value="system">System</option>
              </select>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-0">
            {filteredActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              const StatusIcon = getStatusIcon(activity.status);

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors"
                >
                  {/* Timeline indicator */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    {index < filteredActivities.length - 1 && (
                      <div className="w-px h-8 bg-border mt-2"></div>
                    )}
                  </div>

                  {/* Activity content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">
                            {activity.action}
                          </h3>
                          <Badge className={getStatusColor(activity.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {activity.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.details}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">Load More Activities</Button>
      </div>
    </div>
  );
};

export default ActivityInterface;
