import { ReactElement, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import { BookingDetails, PaymentCard } from "../../components";
import { StripeWrapper } from "../../components/common";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../lib/cache";

const Checkout = (): ReactElement => {
  const router = useRouter();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
  }, []);

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
