import React from "react";
import { Box, Heading } from "@chakra-ui/react";

export const reservations = () => {
  return (
    <Box as="div" p={4}>
      <Box>
        <Heading as="h2" fontSize="3xl">
          Upcoming Reservations
        </Heading>
      </Box>
      <Box>
        <Heading as="h2" fontSize="3xl">
          Past Reservations
        </Heading>
          </Box>
          
    </Box>
  );
};
