"use client";
import { withAuth } from "@/components/auth/withAuth";
import { YoutubeInterface } from "@/components/YoutubeInterface";

const YoutubePage = () => {
  return (
    <div className="p-6">
      <YoutubeInterface />
    </div>
  );
};

export default withAuth(YoutubePage);
