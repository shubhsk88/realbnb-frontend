import { Flex, Text, Progress, HStack, Box, Stack } from "@chakra-ui/react";
import { ReactElement } from "react";

interface ReviewScoreProps {
  name: string;
  rating: number;
}
export const ReviewScore = ({
  name,
  rating,
}: ReviewScoreProps): ReactElement => {
  const ratingValue = (rating / 5) * 100;
  const modifiedReview = name.replace(/([A-Z])/g, " $1");
  return (
    <Flex w="100%" justifyContent="space-between">
      <Text>{modifiedReview[0].toUpperCase() + modifiedReview.slice(1)}</Text>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box w="8rem">
          <Progress colorScheme="teal" size="xs" value={ratingValue} />
        </Box>
        <Text fontSize="xs">{rating.toFixed(2)}</Text>
      </Stack>
    </Flex>
  );
};
