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
import BeatLoader from "react-spinners/BeatLoader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ButtonPrimary } from "./common";
import { paymentSchema } from "@/utils";
import { useCreatePaymentMutation } from "@/generated";
import { PaymentDetails } from "@/lib/cache";

interface PaymentPortalInput {
  firstName: string;
  lastName: string;
}

export const PaymentCard = ({
  paymentDetails,
}: {
  paymentDetails: PaymentDetails;
}): ReactElement => {
  const stripe = useStripe();
  const elements = useElements();

  const cancelRef = useRef();

  const { register, handleSubmit, errors } = useForm<PaymentPortalInput>({
    mode: "onBlur",
    resolver: yupResolver(paymentSchema),
  });
  if (!paymentDetails.room || !paymentDetails.reservation)
    return <div>error</div>;
  console.log(paymentDetails);
  const [errorMsg, setErrorMsg] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [succeeded, setSucceeded] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  debugger;
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
            roomId: paymentDetails.room.id,
          },
        },
      });
    }
  }, [paymentDetails]);

  const onSubmitPayment = async (inputData: PaymentPortalInput) => {
    setIsProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setIsProcessing(false);
    } else {
      setError(null);

      setIsProcessing(false);
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

            {error ? (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <AlertTitle mr={2}>{error}</AlertTitle>
              </Alert>
            ) : null}

            <ButtonPrimary
              type="submit"
              isDisabled={!stripe}
              isLoading={isProcessing}
              spinner={<BeatLoader size={4} color="white" />}
            >
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
