"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Award } from "lucide-react";

export default function DashboardUser() {
  return (
    <div className="p-6 grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen /> Mes cours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Progression : 75%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award /> Certificats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Certificats obtenus : 2</p>
        </CardContent>
      </Card>
    </div>
  );
}
