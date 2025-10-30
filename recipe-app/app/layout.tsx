import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Mes Recettes',
  description: 'Application minimaliste pour gérer vos recettes et votre liste de courses.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-800">
        <header className="p-4 shadow-md bg-white">
          <div className="max-w-2xl mx-auto flex justify-between items-baseline">
            <h1 className="text-xl font-bold">Mes Recettes</h1>
            <nav className="space-x-4 text-sm">
              <a href="/" className="text-blue-600 hover:underline">
                Accueil
              </a>
              <a href="/recipes/new" className="text-blue-600 hover:underline">
                Ajouter
              </a>
              <a href="/shopping-list" className="text-blue-600 hover:underline">
                Liste de courses
              </a>
            </nav>
          </div>
        </header>
        <main className="p-4 max-w-2xl mx-auto">{children}</main>
      </body>
    </html>
  );
}