"use client";

import ActivityInterface from "@/components/ActivityInterface";
import { withAuth } from "@/components/auth/withAuth";

const ActivityPage = () => {
  return <ActivityInterface />;
};

export default withAuth(ActivityPage);
