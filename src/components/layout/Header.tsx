'use client';

import { Shield, User, LogOut, Globe } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { useTranslation } from 'react-i18next';
import useLanguageStore from '@/store/languageStore';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const languages = [
    { code: 'fr', name: 'Français' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'en', name: 'English' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-red-900">AuthApp</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-gray-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {isAuthenticated && user && (
              <>
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
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  icon={LogOut}
                >
                  {t('logout')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}