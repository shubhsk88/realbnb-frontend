import { gql, useQuery } from "@apollo/client";

export const useLoggedIn = () => {
  const isLoggedInQuery = gql`
    query isloggedIn {
      isLoggedIn @client
    }
  `;

  const { data, loading } = useQuery(isLoggedInQuery);
  return { isLoggedIn: data.isLoggedIn, loading };
};
