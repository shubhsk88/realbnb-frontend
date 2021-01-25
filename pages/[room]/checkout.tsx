import { ReactElement } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { BookingDetails, PaymentCard } from "../../components";
import { StripeWrapper } from "../../components/common";

const Checkout = (): ReactElement => {
  return (
    <Stack direction="row" spacing={10} justify="space-between">
      <Box flexBasis="100%">
        <BookingDetails />
      </Box>
      <Box flexBasis="100%">
        <StripeWrapper>
          <PaymentCard />
        </StripeWrapper>
      </Box>
    </Stack>
  );
};

export default Checkout;
