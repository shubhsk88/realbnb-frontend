import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { Review } from "../../generated";

interface CardProps {
  review: Review;
}

export const ReviewCard = ({ review }: CardProps): ReactElement => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const user = review.User;

  return (
    <Box my={10}>
      <Flex alignItems="center" my={6}>
        <Avatar name={user.name} src={user.avatar} />
        <Box mx={4}>
          <Heading as="h5" size="md">
            {user.name}
          </Heading>
          <Text color="gray.400">{review.updated}</Text>
        </Box>
      </Flex>
      <Text noOfLines={isTruncated ? 3 : 0}>{review.content}</Text>
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
