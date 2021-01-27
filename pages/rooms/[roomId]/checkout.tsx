import { ReactElement, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { gql, useReactiveVar, useQuery } from "@apollo/client";

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
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const paymentDetails = useReactiveVar(paymentDetailsVar);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
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
