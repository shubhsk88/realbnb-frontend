import { ReactElement, useEffect } from "react";

import { Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";

import { BookingDetails, PaymentCard } from "@/components";
import { StripeWrapper } from "@/components/common";
import { isLoggedInVar, paymentDetailsVar } from "@/lib/cache";

const Checkout = (): ReactElement => {
  const router = useRouter();

  const details = router.query?.details as string;

  if (!details) return <div>Error While Fetching data</div>;

  const paymentDetails = JSON.parse(details);

  useEffect(() => {
    if (!isLoggedInVar()) router.push("/");
  }, [isLoggedInVar]);
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
