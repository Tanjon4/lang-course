import { redirect } from 'next/navigation';

export default function RootPage() {
  // Rediriger vers l'anglais par défaut
  // Le middleware gérera la détection de langue
  redirect('/en');
}