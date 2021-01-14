import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { useApollo } from "../lib/apolloClient";
import theme from "../styles/theme";
import { ReactElement } from "react";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ChakraProvider>
  );
}
