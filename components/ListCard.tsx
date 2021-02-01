import { List } from "@/generated";
import { Box, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Image } from "@/components/common";

export const ListCard = ({ list }: { list: List }): ReactElement => {
  const image = list?.rooms[0]?.photos[0];

  return (
    <Box
      minH="300px"
      minW="400px"
      shadow="xl"
      overflow="hidden"
      borderRadius="xl"
    >
      <Box background="gray.400" overflow="hidden" w="full" minH="200px">
        {image ? <Image photo={image} /> : null}
      </Box>
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
