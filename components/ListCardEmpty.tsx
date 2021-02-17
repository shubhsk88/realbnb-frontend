import {
  Box,
  Grid,
  Heading,
  Text,
  VStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";

export const ListCardEmpty = (): ReactElement => {
  return (
    <Box
      minH="300px"
      minW="350px"
      shadow="xl"
      overflow="hidden"
      borderRadius="xl"
    >
      <Skeleton h="200px" />

      <VStack spacing={2} align="stretch" p={4}>
        <Skeleton>
          <Text color="gray.600" fontSize="sm">
            Anytime
          </Text>
        </Skeleton>
        <Skeleton h="20px" />
        <Skeleton h="20px" />
        <Skeleton h="20px" />
        <Skeleton>
          {" "}
          <Text fontSize="sm">2 Stay</Text>
        </Skeleton>
      </VStack>
    </Box>
  );
};
