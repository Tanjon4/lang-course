import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-500 mb-8">
          La page que vous recherchez n'existe pas ou la langue n'est pas supportée.
        </p>
        <Link 
          href="/en"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}