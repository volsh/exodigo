import fetchCocktailsByName from "./api/fetchCocktailsByName";
import CocktailsList from "./components/CocktailsList";

export default async function Page() {
  const allCocktails = await fetchCocktailsByName(); // this will prefetch the cocktails on server side for faster performance
  return <CocktailsList initialCocktails={allCocktails} />;
}
