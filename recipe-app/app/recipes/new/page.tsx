import RecipeForm from '@/components/RecipeForm';

export default function NewRecipePage() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ajouter une recette</h2>
      <RecipeForm />
    </div>
  );
}