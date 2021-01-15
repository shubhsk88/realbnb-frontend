import React, { ReactElement, useMemo } from "react";
import { HStack, Icon, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReviewScore } from "./shared/ReviewScore";
import { ReviewCard } from "./shared/ReviewCard";
import { AiOutlineStar } from "react-icons/ai";
import { Review as ReviewType, AverageReviewRating } from "../generated";

interface ReviewProps {
  ratings: AverageReviewRating;
  reviews: ReviewType[];
  overallRating: number;
}

export const Review = ({
  ratings,
  reviews,
  overallRating,
}: ReviewProps): ReactElement => {
  const ratingEntries = useMemo(() => Object.entries(ratings).slice(1), [
    ratings,
  ]);

  return (
    <>
      <HStack fontSize="20px" my={10}>
        <Icon as={AiOutlineStar} />
        <Text fontWeight="bold">
          {overallRating} ({reviews.length})
        </Text>
      </HStack>
      <Wrap spacing="10px" w="100%" justify="space-between">
        {ratingEntries.map(([key, val], index) => (
          <WrapItem w="45%" key={index} textTransform="capitalize">
            <ReviewScore name={key} rating={Number(val)} />
          </WrapItem>
        ))}
      </Wrap>
      <Wrap spacing="20px" w="100%" justify="space-between">
        {reviews.map((review, index) => (
          <WrapItem w="40%" key={index}>
            <ReviewCard review={review} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
