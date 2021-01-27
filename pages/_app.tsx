import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useApollo } from "@/lib/apolloClient";

import theme from "@/styles/theme";
import { Layout } from "@/components/";
import { PaymentProvider } from "@/components/context/PaymentContext";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <PaymentProvider>
      <ChakraProvider theme={theme} resetCSS={true}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </ChakraProvider>
    </PaymentProvider>
  );
}
