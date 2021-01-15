import React from "react";
import { HStack, Icon, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReviewScore } from "./shared/ReviewScore";
import { ReviewCard } from "./shared/ReviewCard";
import { AiOutlineStar } from "react-icons/ai";

export const Review = () => {
  return (
    <>
      <hr />
      <HStack fontSize="20px" my={10}>
        <Icon as={AiOutlineStar} />
        <Text fontWeight="bold">4.2 (249 rating)</Text>
      </HStack>
      <Wrap spacing="10px" w="100%" justify="space-between">
        {Array(4)
          .fill("")
          .map((review, index) => (
            <WrapItem w="45%" key={index}>
              <ReviewScore name="Cleaniness" rating={4.2} />
            </WrapItem>
          ))}
      </Wrap>
      <Wrap spacing="20px" w="100%" justify="space-between">
        {Array(10)
          .fill("")
          .map((review, index) => (
            <WrapItem w="40%" key={index}>
              <ReviewCard />
            </WrapItem>
          ))}
      </Wrap>
    </>
  );
};
