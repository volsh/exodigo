"use client";

import Link from "next/link";
import Image from "next/image";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import SearchBar from "./SearchBar";
import AddCocktailForm from "./AddCocktailForm";
import AllCocktailsContext from "../context/allCocktailsContext";
import getAllCocktailsByName from "../utils/getCocktailsByName";

export default function CocktailsLists({
  initialCocktails,
}: {
  initialCocktails: Array<Cocktail>;
}) {
  const { cocktails, allCocktails, setCocktails, setAllCocktails } =
    useContext(AllCocktailsContext);
  const [search, setSearch] = useState("");
  const [isOpenedAddCocktail, setOpenAddCocktail] = useState(false);

  useEffect(() => {
    debouncedChangeHandler(search);
  }, [search]);

  const handleFetchCocktailsByName = async (name: string = "") => {
    const cocktails = await getAllCocktailsByName(name, allCocktails);
    setCocktails(cocktails);
    if (!name) {
      setAllCocktails(cocktails);
    }
  };

  useEffect(() => {
    if (initialCocktails.length === 0) {
      handleFetchCocktailsByName();
    } else {
      setCocktails(initialCocktails);
      setAllCocktails(initialCocktails);
    }
  }, [initialCocktails]);

  const handleUpdateCocktailsAfterAllCocktailsChange = async () => {
    const cocktails = await getAllCocktailsByName(search, allCocktails);
    setCocktails(cocktails);
  };

  useEffect(() => {
    handleUpdateCocktailsAfterAllCocktailsChange();
  }, [allCocktails]);

  const debouncedChangeHandler = debounce(handleFetchCocktailsByName, 300);

  return (
    <div className="cocktails-list">
      <SearchBar
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <button
        className="btn-add-cocktail"
        onClick={() => setOpenAddCocktail(true)}
      >
        Add new cocktail
      </button>
      {isOpenedAddCocktail && (
        <AddCocktailForm
          isOpened={isOpenedAddCocktail}
          setOpened={setOpenAddCocktail}
        />
      )}
      <section className="cards-container">
        {cocktails?.map((cocktail: Cocktail) => (
          <Link
            className="card"
            key={cocktail.strDrink}
            href={`/cocktails/${cocktail.strDrink}`}
            passHref
          >
            <Image
              src={cocktail.strDrinkThumb || "/images/logo.png"}
              alt={cocktail.strDrink}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
