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
  Input,
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
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { PaymentProviderProps } from "./context/PaymentContext";
import { ButtonPrimary } from "./common";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "../utils";
import { useGetUserQuery } from "../generated";

interface PaymentPortalInput {
  firstName: string;
  lastName: string;
}

export const PaymentCard = ({
  paymentDetails,
}: {
  paymentDetails: PaymentProviderProps;
}): ReactElement => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, errors } = useForm<PaymentPortalInput>({
    mode: "onBlur",
    resolver: yupResolver(paymentSchema),
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const { data: user, error, loading } = useGetUserQuery();

  const onSubmitPayment = async (data: PaymentPortalInput) => {
    // Use your card Element with other Stripe.js APIs

    const { error, paymentMethod } = await stripe.createPaymentMeth({
      type: "card",
      card: elements.getElement(CardNumberElement),
      billing_details: {
        name: data.firstName + data.lastName,
        email: user.profile.user.email,
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
      <Box>
        <form onSubmit={handleSubmit(onSubmitPayment)}>
          <VStack align="stretch" spacing={4}>
            <Heading as="h2">Payment</Heading>

            <HStack>
              <Icon w={10} h={10} as={FaCcVisa} />
              <Icon w={10} h={10} as={FaCcMastercard} />
            </HStack>
            <FormControl id="first" isRequired isInvalid={!!errors?.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                required
                ref={register({ required: true })}
                type="text"
                focusBorderColor="primary"
              />
              <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired id="last" isInvalid={!!errors?.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                required
                ref={register({ required: true })}
                focusBorderColor="primary"
              />
              <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
            </FormControl>
            <Box>
              <Text py={2} fontWeight="bold">
                Card Number
              </Text>
              <Box
                as={CardNumberElement}
                p={3}
                borderRadius="md"
                border="1px"
                borderColor="gray.300"
              />
            </Box>

            <HStack spacing={2} as="div">
              <Box
                as={CardExpiryElement}
                w="50%"
                p={3}
                borderRadius="md"
                border="1px"
                borderColor="gray.300"
              />
              <Box
                as={CardCvcElement}
                w="50%"
                p={3}
                borderRadius="md"
                border="1px"
                borderColor="gray.300"
              />
            </HStack>

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
