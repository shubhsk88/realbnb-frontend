import { Box, BoxProps } from "@chakra-ui/react";
import React, { ElementType, ReactElement, ReactNode } from "react";
import { Header } from "./Header";

const maxW = "1024px";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps): ReactElement => (
  <>
    <Header />
    <LayoutContainer my={16}>{children}</LayoutContainer>
  </>
);

interface ContainerProps extends BoxProps {
  children: ReactNode;
}

export const LayoutContainer = ({
  children,
  ...props
}: ContainerProps): ReactElement => (
  <Box as="main" px={8} {...props}>
    <Box maxW={maxW} w="100%" mx="auto">
      {children}
    </Box>
  </Box>
);
