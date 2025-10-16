// components/Layout.tsx
import React from 'react';
import { Shield, User, LogOut } from 'lucide-react';
import type { User as UserType } from '@/types/auth';

interface LayoutProps {
  children: React.ReactNode;
  user?: UserType;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.username}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-gray-100 rounded-full" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {user.username}
                  </span>
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}