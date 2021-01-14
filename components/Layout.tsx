import { Box } from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { Header } from "./Header";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <>
      <Header />
      <Box as="main" maxW="1200px" w="100%" mx="auto" marginTop="4em">
        {children}
      </Box>
    </>
  );
};

export default Layout;
