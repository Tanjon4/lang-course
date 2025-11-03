'use client';

import React from 'react';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

export default function UserDashboard(){
  const [activePage, setActivePage] = useState("Dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <Dashboard />
    }
  };

  return (
    <main className="">
      {renderContent()}
    </main>
  );
}