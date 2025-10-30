import RecipeView from '@/components/RecipeView';

interface Params {
  id: string;
}

export default function RecipePage({ params }: { params: Params }) {
  const id = Number(params.id);
  return <RecipeView id={id} />;
}