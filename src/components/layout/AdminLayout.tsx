import { ReactNode } from 'react';

// Définition de l'interface
interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* <AdminSidebar />   ⚡ Navigation latérale spécifique */}
      <div className="flex-1 flex flex-col">
        {/*<AdminHeader />   ⚡ Header admin avec outils */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow p-6">
            {children}    {/* ⚡ Contenu admin */}
          </div>
        </main>
      </div>
    </div>
  );
}