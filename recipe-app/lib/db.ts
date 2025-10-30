import Dexie, { Table } from 'dexie';

// Définitions des types de données
export interface Ingredient {
  id: number;
  name: string;
  quantity?: string;
}

export interface Recipe {
  id?: number;
  title: string;
  ingredients: Ingredient[];
  steps: string[];
}

// Base de données locale Dexie
class RecipeDB extends Dexie {
  recipes!: Table<Recipe, number>;

  constructor() {
    super('recipeDB');
    this.version(1).stores({
      recipes: '++id,title'
    });
  }
}

// Instance unique de la base de données
export const db = new RecipeDB();