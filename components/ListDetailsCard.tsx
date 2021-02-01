import {
  Box,
  Heading,
  HStack,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { IoBedOutline } from "react-icons/io5";
import { IconPair } from "./common";

export const ListDetailsCard = () => {
  return (
    <Box
      w="80%"
      p={4}
      cursor="pointer"
      _hover={{ borderRadius: "lg", shadow: "md", backgroundColor: "gray.50" }}
    >
      <Box display="flex" alignItems="center" overflow="hidden">
        <Box w="1000px" borderRadius="lg" h="200px" bg="gray.800" mr={4}></Box>
        <VStack spacing={2} align="stretch" p={4}>
          <Text fontSize="md" color="gray.500">
            Small
          </Text>
          <Heading fontSize="lg">Hotel Title</Heading>
          <Text isTruncated noOfLines={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            cumque laboriosam, provident tempore dignissimos eaque voluptates
            dolore incidunt! Pariatur debitis laborum reprehenderit accusamus
            nulla soluta provident dolorem consequuntur omnis error.
          </Text>
          <Box display="flex" pt={4} justifyContent="space-between">
            <IconPair icon={IoBedOutline}>6</IconPair>
            <Text color="primary" fontWeight="bold" fontSize="3xl">
              $6200
            </Text>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
