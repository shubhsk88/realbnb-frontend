import { InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(
  typeof window !== "undefined" && !!localStorage.getItem("token")
);

export const clientCache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
      },
    },
  },
});
