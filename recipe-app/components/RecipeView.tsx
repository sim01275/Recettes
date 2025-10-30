"use client";

import { useEffect, useState } from 'react';
import { db, Recipe } from '@/lib/db';

interface Props {
  id: number;
}

/**
 * Affiche le détail d'une recette à partir de la base locale en fonction de son identifiant.
 */
export default function RecipeView({ id }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    db.recipes.get(id).then((value) => {
      if (value) setRecipe(value);
    });
  }, [id]);

  if (!recipe) {
    return <p>Chargement…</p>;
  }
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{recipe.title}</h2>
      <div>
        <h3 className="font-semibold mb-1">Ingrédients</h3>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>{ing.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-1">Étapes</h3>
        <ol className="list-decimal list-inside space-y-1">
          {recipe.steps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}