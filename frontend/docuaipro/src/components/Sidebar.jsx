"use client";

import { useState } from "react";
import {
  FileText,
  BarChart3,
  Settings,
  Activity,
  Home,
  Menu,
  X,
  Crown,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: routes.dashboard },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    path: routes.document,
  },
  { id: "upload", label: "Upload", icon: Upload, path: routes.chat },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    path: routes.analytics,
  },
  { id: "activity", label: "Activity", icon: Activity, path: routes.activity },
  {
    id: "subscription",
    label: "Subscription",
    icon: Crown,
    path: routes.subscription,
  },
  { id: "settings", label: "Settings", icon: Settings, path: routes.profile },
];

export function DashboardSidebar({ activeItem, onItemClick }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleClick = (item) => {
    onItemClick(item.id);
    if (item.path) {
      router.push(item.path);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-playfair font-bold text-lg text-sidebar-foreground">
              DocuAI Pro
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? (
            <Menu className="w-4 h-4" />
          ) : (
            <X className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start text-left",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isCollapsed && "justify-center px-2"
              )}
              onClick={() => handleClick(item)}
            >
              <Icon className={cn("w-4 h-4", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.label}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-accent-foreground">
                JD
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.full_name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
