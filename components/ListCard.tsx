import { List } from "@/generated";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const ListCard = ({ list }: { list: List }) => {
  return (
    <Box
      minH="300px"
      minW="400px"
      shadow="xl"
      overflow="hidden"
      borderRadius="xl"
    >
      <Box backgroundColor="gray.400" w="full" minH="200px"></Box>
      <VStack spacing={2} align="stretch" p={4}>
        <Text color="gray.600" fontSize="sm">
          Anytime
        </Text>
        <Heading fontSize="xl">{list.name}</Heading>
        <Text fontSize="sm">{list.rooms.length} Stay</Text>
      </VStack>
    </Box>
  );
};
