import { ReactElement, useEffect, useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ButtonPrimary } from "./common";
import { paymentSchema } from "@/utils/";
import { useCreatePaymentMutation, useGetUserQuery } from "@/generated/";

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
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const cancelRef = useRef();
  const { data: user } = useGetUserQuery();
  const [clientSecret, setClientSecret] = useState("");
  const [onCreatePayment] = useCreatePaymentMutation({
    onCompleted: ({ payment }) => {
      if (payment.ok) {
        setClientSecret(payment.clientSecret);
      } else {
        setError(payment.error);
      }
    },
  });

  useEffect(() => {
    if (paymentDetails) {
      onCreatePayment({
        variables: {
          reservation: {
            price: paymentDetails.reservation.total,
            room: paymentDetails.room.id,
          },
        },
      });
    }
  }, []);
  console.log(clientSecret);

  const onSubmitPayment = async (data: PaymentPortalInput) => {
    // Use your card Element with other Stripe.js APIs

    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });
    console.log(payload);
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
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
