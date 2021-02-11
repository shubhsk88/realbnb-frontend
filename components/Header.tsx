import { ReactElement } from "react";
import { useReactiveVar } from "@apollo/client";
import NextLink from "next/link";
import {
  Link,
  Stack,
  HStack,
  StackProps,
  Heading,
  Box,
} from "@chakra-ui/react";

import { isLoggedInVar } from "../lib/cache";
import { LayoutContainer } from "./Layout";
import { AlgoliaSearch } from "./Algolia/AlgoliaSearch";
import { AccountMenu } from "./index";
import { AuthModal } from "./Auth/AuthModal";

export const Header = (props: StackProps): ReactElement => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <LayoutContainer shadow="lg">
      <HStack py={4} justify="space-between" {...props}>
        <HStack spacing={8} flex={1}>
          <Heading as="h1" color="primary">
            <NextLink href="/">
              <a>Realbnb</a>
            </NextLink>
          </Heading>

          <AlgoliaSearch flex={1} maxW={420} />
        </HStack>

        <Stack direction="row" align="center" spacing={8} fontWeight="bold">
          {isLoggedIn ? (
            <>
              <NextLink href="#">
                <Link>Booking</Link>
              </NextLink>
              <NextLink href="/saved">
                <Link>Saved</Link>
              </NextLink>
            </>
          ) : null}
          {isLoggedIn ? <AccountMenu /> : <AuthModal />}
        </Stack>
      </HStack>
    </LayoutContainer>
  );
};
