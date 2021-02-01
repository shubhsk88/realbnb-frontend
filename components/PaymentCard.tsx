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
  AlertDialogFooter,
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
  Button,
} from "@chakra-ui/react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ButtonPrimary } from "./common";
import { paymentSchema } from "@/utils";
import {
  useCreatePaymentMutation,
  useCreateReservationMutation,
} from "@/generated";
import { PaymentDetails } from "@/lib/cache";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface PaymentPortalInput {
  firstName: string;
  lastName: string;
}

export const PaymentCard = ({
  paymentDetails,
}: {
  paymentDetails: PaymentDetails;
}): ReactElement => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const cancelRef = useRef();

  const { register, handleSubmit, errors } = useForm<PaymentPortalInput>({
    mode: "onBlur",
    resolver: yupResolver(paymentSchema),
  });

  if (!paymentDetails.room || !paymentDetails.reservation)
    return <div>error</div>;

  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [succeeded, setSucceeded] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [onCreatePayment] = useCreatePaymentMutation({
    onCompleted: ({ payment }) => {
      if (payment.ok) {
        setClientSecret(payment.clientSecret);
      } else {
        setError(payment.error);
      }
    },
  });

  const [onCreateReservation] = useCreateReservationMutation({
    onCompleted: ({ reservation }) => {
      if (reservation.ok) {
        setIsDialogOpen(true);
      } else {
        setError(reservation.error);
      }
    },
  });

  useEffect(() => {
    console.log("payment");
    

    if (paymentDetails) {
      onCreatePayment({
        variables: {
          reservation: {
            price: paymentDetails.reservation.total * 100,
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
      const { checkIn, checkOut, total } = paymentDetails.reservation;

      onCreateReservation({
        variables: {
          checkIn,
          checkOut,
          price: total,
          roomId: paymentDetails.room.id,
        },
      });

      setError(null);
      setIsProcessing(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSubmit(onSubmitPayment)}>
          <VStack align="stretch" spacing={4}>
            <Heading as="h2">Payment</Heading>

            <HStack>
              <Icon boxSize={10} as={FaCcVisa} />
              <Icon boxSize={10} as={FaCcMastercard} />
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
        onClose={closeDialog}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="medium"
              textAlign="center"
            >
              Booking successful
            </AlertDialogHeader>

            <AlertDialogBody>
              <HStack spacing={4}>
                <CheckCircleIcon color="green.500" boxSize={10} />
                <Text>
                  ${paymentDetails.reservation.total} was charged to your
                  account.
                </Text>
              </HStack>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="green" onClick={closeDialog}>
                Ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
