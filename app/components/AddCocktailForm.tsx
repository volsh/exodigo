"use client";

import {
  ElementRef,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AllCocktailsContext from "../context/allCocktailsContext";

export default function AddCocktailForm({
  isOpened,
  setOpened,
}: {
  isOpened: boolean;
  setOpened: Function;
}) {
  const { allCocktails, setAllCocktails } = useContext(AllCocktailsContext);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<string>();
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpened]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const newCocktail: { [key: string]: Object } = {};
      newCocktail.added = true;
      for (let [key, value] of formData.entries()) {
        if (value) {
          newCocktail[key] = value.toString();
        }
      }
      setError(null);
      setAlert(`Succefully added ${newCocktail.strDrink}`);
      setAllCocktails([...allCocktails, newCocktail as Cocktail]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="modal-backdrop">
      <dialog
        ref={dialogRef}
        className="modal"
        onClose={() => setOpened(false)}
      >
        {alert && (
          <div className="alert success">
            <span className="close-button" onClick={() => setAlert("")}></span>
          </div>
        )}
        <div className="modal-content">
          {error && <div style={{ color: "red" }}>{error}</div>}
          <form onSubmit={onSubmit}>
            <label>Name:</label>
            <input type="text" name="strDrink" required />
            <label>Thumb image:</label>
            <input type="text" name="strDrinkThumb" />
            <label>Main image:</label>
            <input type="text" name="strImageSource" />
            <button className="submit" type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </button>
          </form>
          <span className="close-button" onClick={() => setOpened(false)}></span>
        </div>
      </dialog>
    </div>
  );
}
