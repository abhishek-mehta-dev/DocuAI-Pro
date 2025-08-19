"use client";

import AnalyticsInterface from "@/components/AnalyticsInterface";
import { withAuth } from "@/components/auth/withAuth";

const AnalyticsPage = () => {
  return <AnalyticsInterface />;
};

export default withAuth(AnalyticsPage);
