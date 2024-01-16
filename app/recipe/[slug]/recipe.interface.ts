interface ImageProps {
  title: string;
  url: string;
  width: number;
  height: number;
}

export interface RecipeProps {
  title: string;
  slug: string;
  cookingTime: string;
  ingredients: string[];
  method: any;
  thumbnail: ImageProps;
  featuredImage: ImageProps;
}
