import { ReactElement } from "react";
import { Link, BoxProps, Stack, HStack, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import { AlgoliaSearch } from "./Algolia/AlgoliaSearch";

import { BsSearch } from "react-icons/bs";

import { isLoggedInVar } from "../lib/cache";
import { useLoggedIn } from "../utils";
import { LayoutContainer } from "./Layout";
import { AccountMenu, Login } from "./index";
import { ModalComponent } from "./common/ModalComponent";

export const Header = (props: BoxProps): ReactElement => {
  const { isLoggedIn, loading: loadLoggedIn } = useLoggedIn();

  return (
    <LayoutContainer shadow="lg" {...props}>
      <HStack py={4} justify="space-between">
        <AlgoliaSearch />

        <Stack direction="row" align="center" spacing={8} fontWeight="bold">
          <NextLink href="#">
            <Link>Booking</Link>
          </NextLink>
          <NextLink href="#">
            <Link>Saved</Link>
          </NextLink>
          {isLoggedIn ? <AccountMenu /> : <ModalComponent />}
        </Stack>
      </HStack>
    </LayoutContainer>
  );
};
