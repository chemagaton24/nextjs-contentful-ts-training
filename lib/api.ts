interface VariableProps {
  preview: boolean;
  [key: string]: any;
}

export function fetchGraphQL<T>(
  query: string,
  variables: VariableProps
): Promise<T> {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          variables?.preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 10 },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .catch((error) => {
      throw new Error(`Error: ${error}`);
    });
}
