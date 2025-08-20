"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="p-6">
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center space-y-2">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <h3 className="text-lg font-medium">Coming Soon</h3>
            <p className="text-muted-foreground">
              This section is under development
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
