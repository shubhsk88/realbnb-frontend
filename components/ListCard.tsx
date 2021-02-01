import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const ListCard = ({list}) => {
  return (
    <Box
      minH="300px"
      maxW="400px"
      shadow="xl"
      overflow="hidden"
      borderRadius="xl"
    >
      <Box backgroundColor="gray.400" w="full" minH="200px"></Box>
      <VStack spacing={2} align="stretch" p={4}>
        <Text color="gray.600" fontSize="sm">
          Anytime
        </Text>
        <Heading fontSize="xl">Bucharest Romania</Heading>
        <Text fontSize="sm">1 Stay</Text>
      </VStack>
    </Box>
  );
};
