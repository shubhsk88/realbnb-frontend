import { Box } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { Header } from "./Header";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <>
      <Header />
      <Box as="main" px="2em" marginTop="4em">
        <Box maxW="1200px" w="100%" mx="auto">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
