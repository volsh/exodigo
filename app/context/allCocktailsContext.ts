import { SetStateAction, createContext } from "react";

const AllCocktailsContext = createContext({
  cocktails: [] as Array<Cocktail>,
  setCocktails: (action: SetStateAction<Cocktail[]>) => {},
  allCocktails: [] as Array<Cocktail>,
  setAllCocktails: (action: SetStateAction<Cocktail[]>) => {},
});
export default AllCocktailsContext;
