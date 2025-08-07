"use client";

import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { user, isLoading, isError } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !user?.data) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center px-4">
        <p className="text-red-500 text-sm">Failed to load profile.</p>
      </div>
    );
  }

  const data = user.data;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            👤
          </div>
          <h1 className="text-xl font-semibold">My Profile</h1>
          <p className="text-sm text-gray-500">View your account details</p>
        </div>

        <Separator className="mb-4" />

        {/* Info Display */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First name</Label>
              <Input value={data.first_name} disabled />
            </div>
            <div>
              <Label>Last name</Label>
              <Input value={data.last_name} disabled />
            </div>
          </div>

          <div>
            <Label>Username</Label>
            <Input value={data.username} disabled />
          </div>

          <div>
            <Label>Email</Label>
            <Input value={data.email} disabled />
          </div>

          <div>
            <Label>User Type</Label>
            <Input value={data.user_type} disabled />
          </div>

          <div>
            <Label>Auth Provider</Label>
            <Input value={data.auth_provider} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}
