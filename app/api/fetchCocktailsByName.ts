import convertToClientCocktail from "../utils/convertToClientCocktail";

export default async function fetchCocktailsByName(
  name: string = ""
): Promise<Array<Cocktail>> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const { drinks } = await res.json();
  return drinks?.map((drink: BaseCocktail) => convertToClientCocktail(drink)) || [];
}
