import { Box, Heading, Text, Icon, Button, IconButton } from "@chakra-ui/react";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import styled from "@emotion/styled";

import { IoBedOutline } from "react-icons/io5"

export const CardVertical = () => {
  return (
    <Box w="320px" h="400px" bgColor="gray.50" boxShadow="md" borderRadius="lg" overflow="hidden">
      <Box position="relative" w="100%" h="40%" borderRadius="inherit" overflow="hidden">
        <Image
          src="https://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/zbr9m61suuhkvo74tsxt.webp"
          layout="fill"
          alt="Image"
        />
        <PlainButton rightIcon={<AiOutlineStar />}>5.0</PlainButton>
        <PlainIconButton aria-label="button" icon={<AiOutlineHeart size="1.3rem" />} />
      </Box>

      <TextWrapper as="section">
        <Text size="xs" fontWeight="medium" color="gray.400">Room Type</Text>
        <Heading as="h3" size="md">Listing Name</Heading>
        <Text as="p">some sample text here blah blah</Text>

        <Text color="gray.400" fontSize="md">
          <Icon as={IoBedOutline} h={6} w={6} /> 2
        </Text>

        <Text fontWeight="extrabold" fontSize="2xl" color="teal.400">$420.69</Text>
      </TextWrapper>
    </Box>
  );
};

const PlainButton = styled(Button)`
  position: absolute;
  bottom: 0.5em;
  left: 0.5em;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);

  :hover, :focus {
    background-color: rgba(0, 0, 0, 0.3)
  }

  :active {
    background-color: rgba(0, 0, 0, 0.5)
  }
`

const PlainIconButton = styled(IconButton)`
  position: absolute;
  top: 0.3em;
  right: 0.3em;

  color: white;
  background-color: transparent;

  &:hover, :focus {
    color: #E2E8F0;
    background-color: transparent;
  }

  &:active {
    color: #CBD5E0;
    background-color: transparent;
  }
`

const TextWrapper = styled(Box)`
  padding: 1rem;

  & > :not(:first-child) {
    padding-top: 0.25rem
  }
`