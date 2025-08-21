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
  Youtube,
  Bot,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import routes from "@/lib/routes";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLogout } from "@/hooks/useUser";
import { useDispatch } from "react-redux";
import { showMessage } from "@/context/store/messageSlice";

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
    id: "youtube",
    label: "YouTube Upload",
    icon: Youtube,
    path: routes.youtube,
  },
  { id: "ai-agents", label: "AI Agents", icon: Bot, path: routes.bot },
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
  const { logoutUser } = useLogout();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (item) => {
    onItemClick(item.id);
    if (item.path) {
      router.push(item.path);
    }
  };
  const handleLogout = async () => {
    try {
      const result = await logoutUser();

      if (result?.message) {
        dispatch(showMessage({ message: result.message, type: "success" }));
      } else {
        dispatch(
          showMessage({ message: "Logout successful", type: "success" })
        );
      }
    } catch (error) {
      dispatch(
        showMessage({
          message: error?.message || "Logout failed",
          type: "error",
        })
      );
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
          <div className="bg-sidebar-accent/50 rounded-lg p-3">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Avatar className="h-8 w-8">
                  {user?.avatar_url && (
                    <AvatarImage src={user.avatar_url} alt={user.full_name} />
                  )}
                  <AvatarFallback className="text-sm font-medium">
                    {user?.first_name?.[0] ?? ""}
                    {user?.last_name?.[0] ?? ""}
                  </AvatarFallback>
                </Avatar>
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
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-left text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="text-sm">Sign out</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
