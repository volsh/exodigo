""

import fetchCocktailsByName from "../api/fetchCocktailsByName";
import getAddedCocktails from "./getAddedCocktails";

export default async function getAllCocktailsByName(name: string, allCocktails? : Array<Cocktail>) {
    const cocktails = await fetchCocktailsByName(name);
    if (allCocktails) {
        return cocktails.concat(getAddedCocktails(allCocktails, name))
    }
    return cocktails
}