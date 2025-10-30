"use client";

import { useEffect, useState } from 'react';
import { db, Recipe } from '@/lib/db';

interface AggregatedItem {
  name: string;
  quantity?: string;
  count: number;
  checked: boolean;
}

/**
 * Compose une liste de courses en agrégeant tous les ingrédients des recettes enregistrées.
 * Permet de cocher chaque élément pour marquer qu'il est acheté.
 */
export default function ShoppingList() {
  const [items, setItems] = useState<AggregatedItem[]>([]);

  useEffect(() => {
    async function aggregate() {
      const recipes: Recipe[] = await db.recipes.toArray();
      const map: Record<string, AggregatedItem> = {};
      for (const recipe of recipes) {
        for (const ing of recipe.ingredients) {
          const key = ing.name.toLowerCase();
          if (!map[key]) {
            map[key] = {
              name: ing.name,
              quantity: ing.quantity,
              count: 1,
              checked: false
            };
          } else {
            map[key].count += 1;
          }
        }
      }
      setItems(Object.values(map));
    }
    aggregate();
  }, []);

  function toggle(name: string) {
    setItems((current) =>
      current.map((item) =>
        item.name === name ? { ...item, checked: !item.checked } : item
      )
    );
  }

  if (items.length === 0) {
    return <p>Aucun ingrédient n'a été ajouté pour l'instant.</p>;
  }
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Liste de courses</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.name} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle(item.name)}
              className="form-checkbox h-4 w-4"
            />
            <span className={item.checked ? 'line-through text-gray-500' : ''}>
              {item.quantity ? `${item.quantity} ` : ''}
              {item.name}
              {item.count > 1 ? ` ×${item.count}` : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}