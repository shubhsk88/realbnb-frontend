import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";

export const ReviewCard = (): ReactElement => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);

  return (
    <Box my={10}>
      <Flex alignItems="center" my={6}>
        <Avatar name="Dan" src="https://bit.ly/dan-abramov" />
        <Box mx={4}>
          <Heading as="h5" size="md">
            Name
          </Heading>
          <Text color="gray.400">Date </Text>
        </Box>
      </Flex>
      <Text noOfLines={isTruncated ? 3 : 0}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt nisi
        non repudiandae modi eaque aliquid mollitia, ullam reprehenderit iure
        sit nam earum sint blanditiis quod ad libero sequi aut? Illo.
      </Text>
      {isTruncated ? (
        <Button
          my={2}
          variant="link"
          onClick={() => setIsTruncated((prev) => !prev)}
        >
          Read More
        </Button>
      ) : null}
    </Box>
  );
};
