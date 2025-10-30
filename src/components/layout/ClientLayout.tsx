'use client';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import Layout from '@/components/layout/BaseLayout';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <Layout>{children}</Layout>
    </I18nextProvider>
  );
}
