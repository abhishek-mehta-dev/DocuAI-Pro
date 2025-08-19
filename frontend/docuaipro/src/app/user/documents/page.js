"use client";
import { withAuth } from "@/components/auth/withAuth";
import DocumentsInterface from "@/components/DocumentsInterface";

const DocumentPage = () => {
  return <DocumentsInterface />;
};

export default withAuth(DocumentPage);
