import { ReactElement } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { BookingDetails, PaymentCard } from "../../components";
import { StripeWrapper } from "../../components/common";
import { usePaymentDetails } from "../../components/context/PaymentContext";

const Checkout = (): ReactElement => {
  const [paymentDetails, _] = usePaymentDetails();
  console.log(paymentDetails);

  return (
    <Stack direction="row" spacing={10} justify="space-between">
      <Box flexBasis="100%">
        <BookingDetails paymentDetails={paymentDetails} />
      </Box>
      <Box flexBasis="100%">
        <StripeWrapper>
          <PaymentCard paymentDetails={paymentDetails} />
        </StripeWrapper>
      </Box>
    </Stack>
  );
};

export default Checkout;
