import { RecipeProps } from "./recipe.interface";
import { fetchGraphQL } from "@/lib/api";
import RECIPES_QUERY from "@/lib/graphql/queries/recipes";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";

export default async function page({ params }: { params: { slug: string } }) {
  const {
    data: { recipeCollection },
  } = await fetchGraphQL<{
    data: { recipeCollection: { items: RecipeProps[] } };
  }>(RECIPES_QUERY, { preview: false, slug: params.slug });

  const { title, cookingTime, ingredients, method, featuredImage } =
    recipeCollection.items[0];

  return (
    <>
      <div className="relative mb-16">
        <Image
          src={featuredImage.url}
          width={featuredImage.width}
          height={featuredImage.height}
          alt={featuredImage.title}
          priority
          className="object-cover aspect-[1160/360] w-full h-auto"
        />
        <h2 className="absolute left-[-0.5rem] bottom-[-0.5rem] shadow-[1px_3px_5px_rgba(0,0,0,0.1)] bg-white text-4xl font-bold p-5 uppercase">
          {title}
        </h2>
      </div>
      <div className="text-2xl [&_p]:my-6 [&_h3]:my-6 [&_h3]:font-bold">
        <p>Takes approx {cookingTime} mins to make</p>
        <h3>INGREDIENTS:</h3>
        {ingredients.map((ingredient, key) => (
          <span key={key}>{ingredient}</span>
        ))}
        <h3>METHOD:</h3>
        {documentToReactComponents(method.json)}
      </div>
    </>
  );
}
