import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";

import { Review } from "@/generated";
import format from "date-fns/format";

interface CardProps extends BoxProps {
  review: Review;
}

export const ReviewCard = ({ review, ...props }: CardProps): ReactElement => {
  const [isTruncated, setIsTruncated] = useState<boolean>(true);
  const user = review.User;

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Avatar name={user.name} src={`https://i.pravatar.cc/300`} />
        <div>
          <Heading as="h5" size="md">
            {user.name}
          </Heading>
          <Text textStyle="labelLight">
            {format(new Date(review.updated), "dd LLL yyyy")}
          </Text>
        </div>
      </HStack>
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
