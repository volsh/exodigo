"use client";

import { useState } from "react";
import AllCocktailsContext from "./context/allCocktailsContext";
import "./global.css";

export default function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const [cocktails, setCocktails] = useState<Array<Cocktail>>([]);
  const [allCocktails, setAllCocktails] = useState<Array<Cocktail>>([]);

  return (
    <html>
      <body>
        <AllCocktailsContext.Provider
          value={{ cocktails, setCocktails, allCocktails, setAllCocktails }}
        >
          {props.children}
          <div id="modal-root" />
        </AllCocktailsContext.Provider>
      </body>
    </html>
  );
}
