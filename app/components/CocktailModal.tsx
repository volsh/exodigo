"use client";

import {
  type ElementRef,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import isEmpty from "lodash/isEmpty";
import AllCocktailsContext from "../context/allCocktailsContext";
import getAllCocktailsByName from "../utils/getCocktailsByName";

export default function CocktailModal({
  cocktailName,
}: {
  cocktailName: string;
}) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const [cocktailObj, setCocktailObj] = useState<{
    cocktail: Cocktail | undefined;
    prevCocktailId: string;
    nextCocktailId: string;
  }>({ cocktail: {} as Cocktail, prevCocktailId: "", nextCocktailId: "" });

  const { cocktails, allCocktails } = useContext(AllCocktailsContext);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  useEffect(() => {
    async function setCocktail() {
      let cocktail = {} as Cocktail | undefined,
        nextCocktailId = "",
        prevCocktailId = "";

      if (cocktails.length > 0) {
        const cocktailIndex = cocktails.findIndex(
          (cocktail: Cocktail) =>
            cocktail.strDrink.toLowerCase() === cocktailName.toLowerCase()
        );
        if (cocktailIndex > -1) {
          cocktail = cocktails[cocktailIndex];
          nextCocktailId =
            cocktailIndex < cocktails.length - 1
              ? cocktails[cocktailIndex + 1].strDrink
              : "";
          prevCocktailId =
            cocktailIndex > 0 ? cocktails[cocktailIndex - 1].strDrink : "";
        }
      }
      if (isEmpty(cocktail)) {
        cocktail = (await getAllCocktailsByName(cocktailName, allCocktails))[0];
      }
      setCocktailObj({
        cocktail: cocktail as Cocktail,
        prevCocktailId,
        nextCocktailId,
      });
    }
    setCocktail();
  }, [cocktailName]);

  function onDismiss() {
    router.push("/");
  }

  const { cocktail, prevCocktailId, nextCocktailId } = cocktailObj;

  return (
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        <div className="modal-content">
          {!isEmpty(cocktail) && (
            <>
              <div className="modal-img-wrapper">
                <Image
                  src={
                    cocktail.strImageSource ||
                    cocktail.strDrinkThumb ||
                    "/images/logo.png"
                  }
                  alt={cocktail.strDrink}
                  fill
                  priority
                />
              </div>
              <div className="modal-text">
                {cocktail.strInstructions && (
                  <div>{cocktail.strInstructions}</div>
                )}
                {cocktail.ingredients && (
                  <ul>
                    {cocktail.ingredients.slice(0, 5).map((ingredient) => {
                      const [[key, value]] = Object.entries(ingredient);
                      return value && <li key={key}>{value}</li>;
                    })}
                  </ul>
                )}
              </div>
            </>
          )}
          <button onClick={onDismiss} className="close-button" />
        </div>
        <nav className="modal-nav">
          {prevCocktailId && (
            <Link href={`/cocktails/${prevCocktailId}`} className="prev">
              <SlArrowLeft fontSize={20} />
            </Link>
          )}
          {nextCocktailId && (
            <Link href={`/cocktails/${nextCocktailId}`} className="next">
              <SlArrowRight fontSize={20} />
            </Link>
          )}
        </nav>
      </dialog>
    </div>
  );
}
