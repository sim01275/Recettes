import { NextResponse } from 'next/server';

/**
 * API de parsing de recettes.
 *
 * Cette route accepte des données JSON au format {
 *   text?: string;
 *   url?: string;
 *   videoUrl?: string;
 * }
 * et renvoie un objet { title, ingredients, steps } ou une erreur.
 */
export async function POST(req: Request) {
  const data = await req.json();
  const { text, url, videoUrl } = data;

  // Parsing à partir d'un bloc de texte
  if (typeof text === 'string' && text.trim().length > 0) {
    const lines = text
      .split('\n')
      .map((l: string) => l.trim())
      .filter(Boolean);
    const ingredients: string[] = [];
    const steps: string[] = [];
    let collectingIngredients = true;
    for (const line of lines) {
      // Heuristique simple : les lignes commençant par un nombre, un tiret ou un point sont considérées comme des étapes
      if (/^(?:\d+\s*[\).]|[-•])/u.test(line)) {
        collectingIngredients = false;
      }
      if (collectingIngredients) {
        ingredients.push(line);
      } else {
        steps.push(line.replace(/^(?:\d+\s*[\).]|[-•])\s*/, ''));
      }
    }
    return NextResponse.json({
      title: 'Recette importée',
      ingredients,
      steps
    });
  }

  // Parsing d'une URL distante : non implémenté (stub)
  if (typeof url === 'string' && url.trim().length > 0) {
    return NextResponse.json(
      {
        error: "Le parsing des recettes à partir d'une URL n'est pas encore implémenté.",
        ingredients: [],
        steps: []
      },
      { status: 501 }
    );
  }

  // Parsing d'une vidéo : non implémenté (stub)
  if (typeof videoUrl === 'string' && videoUrl.trim().length > 0) {
    return NextResponse.json(
      {
        error: "Le parsing des recettes à partir d'une vidéo n'est pas encore implémenté.",
        ingredients: [],
        steps: []
      },
      { status: 501 }
    );
  }

  return NextResponse.json({ error: 'Aucune donnée fournie.' }, { status: 400 });
}