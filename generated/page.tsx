import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient} from '../lib/apolloClient';
import type { NormalizedCacheObject } from '@apollo/client';
export async function getServerPageGetRooms
    (options: Omit<Apollo.QueryOptions<Types.GetRoomsQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.GetRoomsQuery>({ ...options, query:Operations.GetRoomsDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetRooms = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetRoomsQuery, Types.GetRoomsQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetRoomsDocument, options);
};
export type PageGetRoomsComp = React.FC<{data?: Types.GetRoomsQuery, error?: Apollo.ApolloError}>;
export const ssrGetRooms = {
      getServerPage: getServerPageGetRooms,
      
      usePage: useGetRooms,
    }
export async function getServerPageHello
    (options: Omit<Apollo.QueryOptions<Types.HelloQueryVariables>, 'query'>, ctx? :any ){
        const apolloClient = getApolloClient(ctx);
        
        const data = await apolloClient.query<Types.HelloQuery>({ ...options, query:Operations.HelloDocument });
        
        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useHello = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.HelloQuery, Types.HelloQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.HelloDocument, options);
};
export type PageHelloComp = React.FC<{data?: Types.HelloQuery, error?: Apollo.ApolloError}>;
export const ssrHello = {
      getServerPage: getServerPageHello,
      
      usePage: useHello,
    }