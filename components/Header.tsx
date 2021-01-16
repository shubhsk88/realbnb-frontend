import { ReactElement } from "react";
import { Link, BoxProps, Stack, HStack, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";

import { BsSearch } from "react-icons/bs";

import { LayoutContainer } from "./Layout";
import { ButtonPrimary } from "./common";

export const Header = (props: BoxProps): ReactElement => {
  return (
    <LayoutContainer shadow="lg" {...props}>
      <HStack py={4} justify="space-between">
        <NextLink href="/">
          <IconButton as="a" aria-label="home" icon={<BsSearch />} />
        </NextLink>
        <Stack direction="row" align="center" spacing={8} fontWeight="bold">
          <NextLink href="#">
            <Link>Booking</Link>
          </NextLink>
          <NextLink href="#">
            <Link>Saved</Link>
          </NextLink>
          <ButtonPrimary>Login</ButtonPrimary>
        </Stack>
      </HStack>
    </LayoutContainer>
  );
};
