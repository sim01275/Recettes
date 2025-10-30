"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db, Recipe } from '@/lib/db';

/**
 * Affiche la liste des recettes enregistrées en base locale.
 */
export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // Chargement des recettes depuis Dexie
    db.recipes.toArray().then(setRecipes);
    // Réécouter les changements dans la base (optionnel)
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recettes enregistrées</h2>
      {recipes.length === 0 ? (
        <p>Aucune recette n'a été ajoutée pour l'instant.</p>
      ) : (
        <ul className="space-y-2">
          {recipes.map((recipe) => (
            <li key={recipe.id} className="border rounded p-3 hover:bg-gray-100">
              <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}