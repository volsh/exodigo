import CocktailModal from "../../components/CocktailModal";

export default async function CocktailPage({
  params: { id: cocktailName },
}: {
  params: { id: string };
}) {
  return <CocktailModal cocktailName={cocktailName} />;
}
