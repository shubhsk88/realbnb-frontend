import { Room } from "@/generated";
import {
  Box,
  Divider,
  Heading,
  HStack,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { IconPair } from "./common";

export const ListDetailsCard = ({ room }: { room: Room }) => {
  return (
    <>
      <Box
        w="80%"
        p={4}
        cursor="pointer"
        _hover={{
          borderRadius: "lg",
          shadow: "md",
          backgroundColor: "gray.50",
        }}
      >
        <Box display="flex" alignItems="center" overflow="hidden">
          <Box w="700px" borderRadius="lg" h="200px" bg="gray.800" mr={4}></Box>
          <VStack spacing={2} align="stretch" p={4}>
            <Text fontSize="md" color="gray.500">
              {room.roomType.name}
            </Text>
            <Heading fontSize="lg">{room.name}</Heading>
            <Text isTruncated noOfLines={2}>
              {room.description}
            </Text>
            <Box display="flex" pt={4} justifyContent="space-between">
              <IconPair icon={IoBedOutline}>{room.beds}</IconPair>
              <Text color="primary" fontWeight="bold" fontSize="3xl">
                ${room.price}
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};
