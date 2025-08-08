"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DocuAILoader from "../Loader";
import { useProfile } from "@/hooks/useUser";
import routes from "@/lib/routes";

export function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const { user, isLoading, isError } = useProfile();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isLoading) {
        if (isError || !user) {
          router.replace(routes.login);
        } else {
          setLoading(false);
        }
      }
    }, [user, isLoading, isError, router]);

    if (loading) return <DocuAILoader />;

    return <WrappedComponent {...props} user={user?.data || user} />;
  };
}
