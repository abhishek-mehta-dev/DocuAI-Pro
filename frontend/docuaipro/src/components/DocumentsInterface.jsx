"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Upload,
  Filter,
  Download,
  Eye,
  Trash2,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

const DocumentsInterface = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  // Mock document data
  const documents = [
    {
      id: 1,
      name: "Q4 Financial Report.pdf",
      uploadDate: "2024-01-15",
      status: "processed",
      size: "2.4 MB",
      pages: 24,
      type: "pdf",
      description: "Quarterly financial analysis and projections",
    },
    {
      id: 2,
      name: "Marketing Strategy 2024.pdf",
      uploadDate: "2024-01-14",
      status: "processing",
      size: "1.8 MB",
      pages: 18,
      type: "pdf",
      description: "Annual marketing strategy document",
    },
    {
      id: 3,
      name: "Employee Handbook.pdf",
      uploadDate: "2024-01-13",
      status: "failed",
      size: "3.2 MB",
      pages: 45,
      type: "pdf",
      description: "Company policies and procedures",
    },
    {
      id: 4,
      name: "Product Specifications.pdf",
      uploadDate: "2024-01-12",
      status: "processed",
      size: "1.5 MB",
      pages: 12,
      type: "pdf",
      description: "Technical product documentation",
    },
    {
      id: 5,
      name: "Legal Contract Draft.pdf",
      uploadDate: "2024-01-11",
      status: "processed",
      size: "0.8 MB",
      pages: 8,
      type: "pdf",
      description: "Partnership agreement draft",
    },
    {
      id: 6,
      name: "Research Analysis.pdf",
      uploadDate: "2024-01-10",
      status: "processing",
      size: "4.1 MB",
      pages: 67,
      type: "pdf",
      description: "Market research and competitive analysis",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "processed":
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case "processing":
        return <Clock className="w-4 h-4 text-primary" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      processed: "bg-accent text-accent-foreground",
      processing: "bg-primary text-primary-foreground",
      failed: "bg-destructive text-destructive-foreground",
    };

    return (
      <Badge className={variants[status] || "bg-muted text-muted-foreground"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || doc.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-serif">
            Documents
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your processed documents
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="all">All Status</option>
                <option value="processed">Processed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold text-foreground">
                  {documents.length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold text-accent">
                  {documents.filter((d) => d.status === "processed").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold text-primary">
                  {documents.filter((d) => d.status === "processing").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold text-destructive">
                  {documents.filter((d) => d.status === "failed").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card
            key={document.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <CardTitle className="text-lg font-semibold text-foreground truncate">
                    {document.name}
                  </CardTitle>
                </div>
                {getStatusIcon(document.status)}
              </div>
              <div className="flex items-center gap-2 mt-2">
                {getStatusBadge(document.status)}
                <span className="text-sm text-muted-foreground">
                  {document.size}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {document.description}
              </p>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(document.uploadDate).toLocaleDateString()}
                </div>
                <span>{document.pages} pages</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No documents found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Upload your first document to get started"}
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DocumentsInterface;
