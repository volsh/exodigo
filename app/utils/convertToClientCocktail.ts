export default function convertToClientCocktail(
  cocktail: Record<string, string>
) {
  const ingredients: Array<Record<string, string>> = [];

  for (let key in cocktail) {
    if (key.startsWith("strIngredient")) {
      ingredients.push({ [key]: cocktail[key] });
    }
  }
  return { ...cocktail, ingredients } as Cocktail;
}
