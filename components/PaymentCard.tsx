import { ReactElement, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  Alert,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Box,
  BoxProps,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

import { ButtonPrimary } from "./common";

export const PaymentCard = (props: BoxProps): ReactElement => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: "John Doe",
        email: "johndoe@gmail.com",
      },
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      if (errorMsg) setErrorMsg("");
      setIsDialogOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
      // console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <>
      <Box {...props}>
        <form onSubmit={handleSubmit}>
          <VStack align="stretch" spacing={4}>
            <Heading as="h2">Payment</Heading>

            <HStack>
              <Text color="primary">$3032</Text>
              <Text textStyle="labelLight">/ night</Text>
            </HStack>

            <HStack>
              <Icon as={FaCcVisa} />
              <Icon as={FaCcMastercard} />
            </HStack>

            <CardNumberElement />
            <CardExpiryElement />
            <CardCvcElement />

            {errorMsg ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle mr={2}>{errorMsg}</AlertTitle>
              </Alert>
            ) : null}

            <ButtonPrimary type="submit" isDisabled={!stripe}>
              Confirm
            </ButtonPrimary>
          </VStack>
        </form>
      </Box>

      <AlertDialog
        isOpen={isDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Payment was successful
            </AlertDialogHeader>

            <AlertDialogBody>
              $3032 was charged to your account.
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
