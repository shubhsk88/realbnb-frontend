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
    <Box>
      <Box w="200px" h="100px" bg="gray.800"></Box>
      <VStack>
        <Text fontSize="sm">Small</Text>
        <Heading fontSize="lg">Hotel Title</Heading>
        <Text isTruncated noOfLines={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          cumque laboriosam, provident tempore dignissimos eaque voluptates
          dolore incidunt! Pariatur debitis laborum reprehenderit accusamus
          nulla soluta provident dolorem consequuntur omnis error.
        </Text>
        <Box display="flex" justifyContent="space-between">
          <IconPair icon={IoBedOutline}>6</IconPair>
          <StatNumber color="primary" fontSize="xl">
            $6200
          </StatNumber>
        </Box>
      </VStack>
    </Box>
  );
};
