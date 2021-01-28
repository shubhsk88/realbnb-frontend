import { ReactElement, useEffect } from "react";

import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { gql, useReactiveVar } from "@apollo/client";

import { BookingDetails, PaymentCard } from "@/components";
import { StripeWrapper } from "@/components/common";
import { isLoggedInVar, paymentDetailsVar } from "@/lib/cache";

export const PAYMENT_DETAILS = gql`
  query PaymentDetails {
    paymentDetails @client
  }
`;

const Checkout = (): ReactElement => {
  const router = useRouter();

  const paymentDetails = useReactiveVar(paymentDetailsVar);
  console.log("checkout");

  useEffect(() => {
    if (!isLoggedInVar()) router.push("/");
  }, []);
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
