// components/Layout.tsx
import React from 'react';
import { Shield, User, LogOut } from 'lucide-react';
import type { User as UserType } from '@/types/auth';
import Navbar from './Navbar'; 
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  user?: UserType;
}

export default function Layout({ children, user }: LayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        
      <Navbar />      
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}