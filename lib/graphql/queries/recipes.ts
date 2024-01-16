const IMAGE_FRAGMENT = `
  title
  url
  width
  height
`;

const RECIPES_QUERY = `
  query Recipe($slug: String) {
    recipeCollection( where: {slug: $slug }) {
      items {
        title
        slug
        cookingTime
        ingredients
        method {
          json
        }
        thumbnail {
          ${IMAGE_FRAGMENT}
        }
        featuredImage {
          ${IMAGE_FRAGMENT}
        }
      }
    }
  }
`;

export default RECIPES_QUERY;
