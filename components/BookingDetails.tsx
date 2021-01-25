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

export const BookingDetails = (): ReactElement => {
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
              src="https://via.placeholder.com/150"
              width="200px"
              height="100px"
              objectFit="cover"
            />
          </Box>
          <VStack align="stretch" spacing={1}>
            <Text fontWeight="bold" color="gray.400">
              Hotel Room
            </Text>
            <Text fontWeight="bold" fontSize="xl">
              Bright and dry Bright and dryBright and dryBright and dryBright
              and dry
            </Text>
            <Text fontWeight="semibold" color="gray.400">
              Address
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
        {details.map((detail) => (
          <Box fontWeight="bold" key={detail.description}>
            <Text my={1} color="gray.400">
              {detail.label}
            </Text>
            <Text>{detail.description}</Text>
          </Box>
        ))}
      </Grid>

      <HStack fontWeight="bold" fontSize="lg">
        <Text flex={1}>$285 x 9</Text>
        <Text flex={1}>$2565</Text>
      </HStack>

      <HStack fontWeight="bold" fontSize="lg">
        <Text flex={1}>Total</Text>
        <Text flex={1} color="primary" fontSize="xl">
          $2565
        </Text>
      </HStack>
    </VStack>
  );
};
