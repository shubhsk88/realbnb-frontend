import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { useApollo } from "../lib/apolloClient";
import theme from "../styles/theme";

import { Layout } from "../components";
import { PaymentProvider } from "../components/context/PaymentContext";

export default function App({ Component, pageProps }: AppProps): ReactElement {
  const apolloClient = useApollo(pageProps.initialApolloState);

  Sentry.init({
    dsn: process.env.SENTRY_KEY,
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
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
