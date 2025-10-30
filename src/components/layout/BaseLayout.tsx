// components/Layout.tsx
import React from 'react';
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
      
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}