"use client";
import React, { useCallback, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useProfile } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { withAuth } from "@/components/auth/withAuth";
import {
  User,
  Mail,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  Settings,
  Key,
  Bell,
  Globe,
  Calendar,
  MapPin,
  Phone,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Upload,
  Download,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import { useProfile } from "@/hooks/useUser";

const ProfilePage = () => {
  const { user, isLoading, isError } = useProfile();

  // Interactive state
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
  });

  const data = user?.data;

  const handleEdit = useCallback(() => {
    setIsEditing(true);
    setEditedData({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      username: data.username || "",
      email: data.email || "",
    });
  }, [data]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setEditedData({
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      username: data.username || "",
      email: data.email || "",
    });
  }, [data]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSaving(false);
      setIsEditing(false);
      console.log("Profile updated:", editedData);
    } catch (error) {
      setIsSaving(false);
      console.error("Save failed:", error);
    }
  }, [editedData]);

  const handleInputChange = useCallback((field, value) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAvatarUpload = useCallback(() => {
    // Simulate file upload
    console.log("Avatar upload triggered");
  }, []);

  const handleNotificationChange = useCallback((type, value) => {
    setNotifications((prev) => ({ ...prev, [type]: value }));
  }, []);

  const handlePrivacyChange = useCallback((setting, value) => {
    setPrivacy((prev) => ({ ...prev, [setting]: value }));
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  // Initialize edited data when user data loads - Fixed dependency
  useEffect(() => {
    if (user?.data && Object.keys(editedData).length === 0) {
      setEditedData({
        first_name: user.data.first_name || "",
        last_name: user.data.last_name || "",
        username: user.data.username || "",
        email: user.data.email || "",
      });
    }
  }, [user?.data, editedData]);

  // Existing loading state preserved
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="w-full max-w-2xl">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Existing error state preserved
  if (isError || !user?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Profile Error
            </h2>
            <p className="text-red-500 text-sm mb-4">Failed to load profile.</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-4xl mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Account Settings
            </h1>
            <p className="text-gray-600">
              Manage your profile and account preferences
            </p>
          </div>

          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button onClick={handleEdit} variant="outline" size="sm">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        size="sm"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={data.avatar || "/placeholder.svg"}
                        alt={data.first_name}
                      />
                      <AvatarFallback className="text-lg">
                        {data.first_name?.[0]}
                        {data.last_name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                        onClick={handleAvatarUpload}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {data.first_name} {data.last_name}
                    </h3>
                    <p className="text-gray-600">@{data.username}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {data.user_type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {data.auth_provider}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="firstName"
                        value={
                          isEditing
                            ? editedData.first_name || ""
                            : data.first_name || ""
                        }
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="lastName"
                        value={
                          isEditing
                            ? editedData.last_name || ""
                            : data.last_name || ""
                        }
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="username"
                        value={
                          isEditing
                            ? editedData.username || ""
                            : data.username || ""
                        }
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        value={
                          isEditing ? editedData.email || "" : data.email || ""
                        }
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Change Password</h4>
                      <p className="text-sm text-gray-600">
                        Update your account password
                      </p>
                    </div>
                    <Button variant="outline">
                      <Key className="w-4 h-4 mr-2" />
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Login Sessions</h4>
                      <p className="text-sm text-gray-600">
                        Manage your active sessions
                      </p>
                    </div>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium capitalize">
                          {key === "email"
                            ? "Email Notifications"
                            : key === "push"
                            ? "Push Notifications"
                            : "Marketing Communications"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === "email"
                            ? "Receive notifications via email"
                            : key === "push"
                            ? "Receive push notifications"
                            : "Receive marketing and promotional emails"}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          handleNotificationChange(key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {Object.entries(privacy).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">
                          {key === "profileVisible"
                            ? "Profile Visibility"
                            : key === "showEmail"
                            ? "Show Email Address"
                            : "Show Phone Number"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === "profileVisible"
                            ? "Make your profile visible to other users"
                            : key === "showEmail"
                            ? "Display your email address on your profile"
                            : "Display your phone number on your profile"}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          handlePrivacyChange(key, e.target.checked)
                        }
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-red-600">Danger Zone</h4>
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-800">
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-600">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);
