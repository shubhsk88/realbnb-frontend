import { ReactElement } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { BookingDetails } from "../../components";

const Checkout = (): ReactElement => {
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
