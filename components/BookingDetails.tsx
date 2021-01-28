import { ReactElement } from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import format from "date-fns/format";
import Image from "next/image";
import { IoBedOutline } from "react-icons/io5";
import { IconPair } from "./common";

import { useGetUserQuery } from "@/generated";
import { PaymentDetails } from "@/lib/cache";

export const BookingDetails = ({
  paymentDetails,
}: {
  paymentDetails: PaymentDetails;
}): ReactElement => {
  console.log("booking details");

  const { data, error, loading } = useGetUserQuery();

  if (!paymentDetails.room || !paymentDetails.reservation)
    return <div>error</div>;

  const checkIn = new Date(paymentDetails.reservation.checkIn);
  const checkOut = new Date(paymentDetails.reservation.checkOut);

  return (
    <VStack
      align="stretch"
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
    >
      <Box>
        <Heading mb={14} fontSize="3xl" as="h2">
          Booking Details
        </Heading>

        <HStack spacing={5} alignItems="center">
          <Box borderRadius="md" h="100%" overflow="hidden">
            <Image
              src={paymentDetails.room.photos[0].link}
              width="200px"
              height="100px"
              objectFit="cover"
            />
          </Box>
          <VStack align="stretch" spacing={1}>
            <Text fontWeight="bold" color="gray.400">
              {paymentDetails.room.roomType.name}
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              {paymentDetails.room.name}
            </Text>
            <Text fontWeight="semibold" color="gray.400">
              {paymentDetails.room.address.address}
            </Text>
            <Box color="gray.400">
              <IconPair icon={IoBedOutline} my={1}>
                Beds
              </IconPair>
            </Box>
          </VStack>
        </HStack>
      </Box>

      <Grid templateColumns="repeat(2,1fr)" gap={4}>
        <Box fontWeight="bold">
          <Text my={1} color="gray.400">
            Check-In
          </Text>
          <Text>{format(checkIn, "d LLLL, EEEE")}</Text>
        </Box>

        <Box fontWeight="bold">
          <Text my={1} color="gray.400">
            Check-Out
          </Text>
          <Text>{format(checkOut, "d LLLL, EEEE")}</Text>
        </Box>

        <Box fontWeight="bold">
          <Text my={1} color="gray.400">
            Name
          </Text>
          <Text>{data.profile.user.name}</Text>
        </Box>
      </Grid>

      <HStack fontWeight="bold" fontSize="lg">
        <Text flex={1}>
          ${paymentDetails.room.price} x {paymentDetails.reservation.days}
        </Text>
        <Text flex={1}>${paymentDetails.reservation.total}</Text>
      </HStack>

      <HStack fontWeight="bold" fontSize="lg">
        <Text flex={1}>Total</Text>
        <Text flex={1} color="primary" fontSize="xl">
          ${paymentDetails.reservation.total}
        </Text>
      </HStack>
    </VStack>
  );
};
