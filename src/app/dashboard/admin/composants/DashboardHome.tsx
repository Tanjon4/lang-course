import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardCards from "./DashboardCards";
import ProjectAnalytics from "../composants/ProjectAnalytics";
import TeamCollaboration from "./TeamCollaboration";
import ProjectProgress from "./ProjectProgress";
import TimeTracker from "./TimeTracker";

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <ProjectAnalytics />
          <TeamCollaboration />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <ProjectProgress />
          <TimeTracker />
        </div>
      </div>
    </div>
  );
}
