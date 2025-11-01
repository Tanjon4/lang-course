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
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-zinc-100 ">
        
      <Navbar />      
      
      <main className="grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}