"use client";
import { withAuth } from "@/components/auth/withAuth";
import SubscriptionInterface from "@/components/SubscriptionInterface";

const SubscriptionPage = () => {
  return <SubscriptionInterface />;
};

export default withAuth(SubscriptionPage);
