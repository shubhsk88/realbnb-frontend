import { ReactElement } from "react";
import { Link, Stack, HStack, StackProps } from "@chakra-ui/react";
import NextLink from "next/link";

import { useLoggedIn } from "@/utils";
import { AlgoliaSearch } from "./Algolia/AlgoliaSearch";
import { LayoutContainer } from "./Layout";
import { AccountMenu } from "./index";
import { AuthModal } from "./Auth/AuthModal";

export const Header = (props: StackProps): ReactElement => {
  const { isLoggedIn, loading } = useLoggedIn();

  return (
    <LayoutContainer shadow="lg">
      <HStack py={4} justify="space-between" {...props}>
        <AlgoliaSearch />

        <Stack direction="row" align="center" spacing={8} fontWeight="bold">
          <NextLink href="#">
            <Link>Booking</Link>
          </NextLink>
          <NextLink href="#">
            <Link>Saved</Link>
          </NextLink>
          {isLoggedIn ? <AccountMenu /> : <AuthModal />}
        </Stack>
      </HStack>
    </LayoutContainer>
  );
};
