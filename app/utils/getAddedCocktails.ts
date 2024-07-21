export default function getAddedCocktails(
  cocktails: Array<Cocktail>,
  name?: string
) {
  const addedCocktails = cocktails.filter((cocktail) => cocktail.added);
  return name
    ? addedCocktails.filter((cocktail) => cocktail.strDrink.includes("name"))
    : addedCocktails;
}
