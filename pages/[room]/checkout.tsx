import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { BookingDetails } from "../../components/BookingDetails";

const Checkout = () => {
  return (
    <Flex maxH="100%" overflow="hidden" justifyContent="space-between">
      <Box flexBasis="100%">
        <BookingDetails />
      </Box>
      <Box flexBasis="100%">Black</Box>
    </Flex>
  );
};

export default Checkout;
