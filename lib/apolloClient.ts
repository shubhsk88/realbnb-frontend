/* eslint-disable */
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  gql,
} from "@apollo/client";
import Cookies from 'js-cookie';

import { useMemo } from "react";
import { clientCache } from "./cache";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

export const getApolloClient = (
  _ = null,
  initialState: NormalizedCacheObject = {}
) => {
  const token = Cookies.get("token");
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    fetch,
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  const cache = clientCache.restore(initialState);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httpLink,
    cache,
  });
};

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? getApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
