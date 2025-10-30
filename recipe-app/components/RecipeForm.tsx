"use client";

import { useState } from 'react';
import { db } from '@/lib/db';

/**
 * Formulaire d'ajout de recette. Permet de saisir un texte, une URL ou un lien vidéo.
 * Utilise l'API /api/parse pour extraire les ingrédients et les étapes.
 */
export default function RecipeForm() {
  const [inputType, setInputType] = useState<'text' | 'url' | 'video'>('text');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Construction de la requête en fonction du type
      const body: any = {};
      if (inputType === 'text') body.text = input;
      if (inputType === 'url') body.url = input;
      if (inputType === 'video') body.videoUrl = input;

      const res = await fetch('/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Une erreur est survenue.');
        return;
      }
      const { title, ingredients, steps } = data;
      // Insertion en base locale
      const id = await db.recipes.add({
        title,
        ingredients: ingredients.map((name: string, idx: number) => ({ id: idx, name })),
        steps
      });
      // Redirection vers la page de la recette ajoutée
      window.location.href = `/recipes/${id}`;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="type" className="mr-2 font-semibold">
          Source
        </label>
        <select
          id="type"
          value={inputType}
          onChange={(e) => setInputType(e.target.value as any)}
          className="border rounded p-2"
        >
          <option value="text">Texte</option>
          <option value="url">Lien</option>
          <option value="video">Vidéo</option>
        </select>
      </div>
      <div>
        {inputType === 'text' ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={8}
            placeholder="Copiez/collez ici les ingrédients puis les étapes de la recette"
            className="border rounded w-full p-2"
          />
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={inputType === 'url' ? 'URL de la recette' : 'Lien de la vidéo'}
            className="border rounded w-full p-2"
          />
        )}
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Analyse...' : 'Ajouter la recette'}
      </button>
    </form>
  );
}