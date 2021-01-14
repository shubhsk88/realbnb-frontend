import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Header } from "./Header";

const Layout = ({ children }): ReactElement => {
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
