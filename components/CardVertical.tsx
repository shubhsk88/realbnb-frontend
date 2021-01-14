import { Box, Heading, Text, Icon, Button, IconButton } from "@chakra-ui/react";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import styled from "@emotion/styled";
import { Room } from "../generated";

import { IoBedOutline } from "react-icons/io5";
import { ReactElement } from "react";

export const CardVertical = ({ room }: { room: Room }): ReactElement => {
  return (
    <Box
      w="25rem"
      bgColor="gray.50"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        position="relative"
        w="100%"
        h="200px"
        borderRadius="inherit"
        overflow="hidden"
      >
        {/* TODO: image caption */}
        <Image
          src={
            room.photos.length
              ? room.photos[0].link
              : "https://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/zbr9m61suuhkvo74tsxt.webp"
          }
          layout="fill"
          sizes="500px"
          alt="image caption"
          objectFit="cover"
        />
        <PlainButton rightIcon={<AiOutlineStar />}>5.0</PlainButton>
        <PlainIconButton
          aria-label="button"
          icon={<AiOutlineHeart size="1.3rem" />}
        />
      </Box>

      <TextWrapper as="section">
        <Text size="xs" fontWeight="medium" color="gray.400">
          {room.roomType.name}
        </Text>
        <Heading as="h3" size="md">
          {room.name}
        </Heading>
        <Text as="p">{room.description}</Text>

        <Text color="gray.400" fontSize="md">
          <Icon as={IoBedOutline} h={6} w={6} />
          {room.beds}
        </Text>

        <Text fontWeight="extrabold" fontSize="2xl" color="primary">
          ${room.price}
        </Text>
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

  :hover,
  :focus {
    background-color: rgba(0, 0, 0, 0.3);
  }

  :active {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const PlainIconButton = styled(IconButton)`
  position: absolute;
  top: 0.3em;
  right: 0.3em;

  color: white;
  background-color: transparent;

  &:hover,
  :focus {
    color: #e2e8f0;
    background-color: transparent;
  }

  &:active {
    color: #cbd5e0;
    background-color: transparent;
  }
`;

const TextWrapper = styled(Box)`
  padding: 1rem;
  margin-top: auto;

  & > :not(:first-child) {
    padding-top: 0.25rem;
  }
`;
