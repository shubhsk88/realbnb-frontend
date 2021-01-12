import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
