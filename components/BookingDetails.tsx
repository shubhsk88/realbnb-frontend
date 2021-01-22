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
import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { IconPair } from "./common";

export const BookingDetails = () => {
  const details = [
    { label: "Check-In", description: format(new Date(), "d LLLL, EEEE") },
    { label: "Check-Out", description: format(new Date(), "d LLLL, EEEE") },
    { label: "First Name", description: "Same" },
    { label: "Last name", description: "Swift" },
    { label: "Email", description: "same@swift.com" },
    {
      label: "Phone Number",
      description: "+124354241",
    },
  ];
  return (
    <VStack divider={<StackDivider borderColor="gray.600" />} spacing={4}>
      <Box>
        <Heading fontSize="md">Booking Details</Heading>
        <HStack>
          <Image
            src="https://via.placeholder.com/150"
            width="100px"
            height="100px"
          />
          <Box>
            <Text>Hotel Room</Text>
            <Text>Bright and dry</Text>
            <Text>Address</Text>
            <Box>
              <IconPair icon={IoBedOutline} my={3}>
                Beds
              </IconPair>
            </Box>
          </Box>
        </HStack>
      </Box>
      <Grid templateColumns="repeat(2,1fr)">
        {details.map((detail) => (
          <Box key={detail.description}>
            <Text>{detail.label}</Text>
            <Text>{detail.description}</Text>
          </Box>
        ))}
      </Grid>
      <HStack spacing={6}>
        <Text>$285 x 9</Text>
        <Text>$2565</Text>
      </HStack>
      <HStack spacing={6}>
        <Text>Total</Text>
        <Text>$2565</Text>
      </HStack>
    </VStack>
  );
};
