type BaseCocktail = {
  strDrink: string;
  strDrinkThumb?: string;
  strImageSource?: string;
  strInstructions?: string;
};

type Cocktail = BaseCocktail & {
  ingredients?: Array<Record<string, string>>;
  added?: boolean;
};
