import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { BookingDetails } from "../../components/BookingDetails";

const Checkout = () => {
  return (
    <Flex justifyContent="space-between">
      <BookingDetails />
      <Box w="100%">Black</Box>
    </Flex>
  );
};

export default Checkout;
