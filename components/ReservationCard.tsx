import { Box, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { Reservation } from "@/generated";
import format from "date-fns/format";

interface ReservationCardProps {
  reservation: Reservation;
}

export const ReservationCard = ({ reservation }: ReservationCardProps) => {
  return (
    <Box overflow="hidden" shadow="lg" borderRadius="lg">
      <Image
        width="100%"
        height="200px"
        src={reservation.Room.photos[0].link}
        objectFit="cover"
      />
      <VStack p={4} align="stretch">
        <Text fontSize="xl" fontWeight="bold">
          {reservation.Room.name}
        </Text>
        <Box as="div" display="flex" justifyContent="space-around">
          <Text color="gray.600">
            Check In:{format(new Date(reservation.checkIn), "d MMM YY")}
          </Text>
          <Text color="gray.600">
            Check out: {format(new Date(reservation.checkOut), "d MMM YY")}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};
