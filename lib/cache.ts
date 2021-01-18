import { InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem("token"));

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
