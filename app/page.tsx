import { fetchGraphQL } from "@/lib/api";
import RECIPES_QUERY from "@/lib/graphql/queries/recipes";
import Image from "next/image";
import { RecipeProps } from "./recipe/[slug]/recipe.interface";
import Link from "next/link";

export default async function Home() {
  const {
    data: { recipeCollection },
  } = await fetchGraphQL<{
    data: { recipeCollection: { items: RecipeProps[] } };
  }>(RECIPES_QUERY, { preview: false });

  const recipes = recipeCollection.items;

  return (
    <ul className="grid grid-cols-2 gap-10">
      {recipes?.map(({ title, slug, cookingTime, thumbnail }, key) => (
        <li key={`${key}-${slug}`}>
          <Link href={`/recipe/${slug}`}>
            <div className="shadow-[1px_3px_5px_rgba(0,0,0,0.1)]">
              <Image
                src={thumbnail.url}
                width={thumbnail.width}
                height={thumbnail.height}
                alt={thumbnail.title}
                priority={key === 0}
                className="object-cover aspect-[555/380] w-auto h-auto"
              />
              <div className="bg-white p-4 text-2xl">
                <h4 className="uppercase font-bold">{title}</h4>
                <p className="text-gray-500">
                  Takes approx {cookingTime} mins to make
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
