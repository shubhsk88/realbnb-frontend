import { ReactElement } from "react";
import styled from "@emotion/styled";

import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { Photo, Room } from "../generated";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";

import { ButtonOpaque, IconButtonClear, IconPair } from "./shared";
interface CardProps {
  room: Room;
}

export const CardVertical = ({ room }: CardProps): ReactElement => {
  return (
    <Box
      w="25rem"
      h="100%"
      bgColor="gray.50"
      boxShadow="md"
      borderRadius="lg"
      overflow="hidden"
    >
      <RoomImage photos={room.photos} />

      <TextWrapper as="section">
        <Text size="xs" fontWeight="medium" color="gray.400">
          {room.roomType.name}
        </Text>
        <Heading as="h3" size="md">
          {room.name}
        </Heading>
        <Text as="p">{room.description}</Text>

        <Box mt="auto">
          <IconPair icon={IoBedOutline} my={4}>
            {room.beds}
          </IconPair>

          <Text fontWeight="extrabold" fontSize="2xl" color="primary">
            ${room.price}
          </Text>
        </Box>
      </TextWrapper>
    </Box>
  );
};

const TextWrapper = styled(Box)`
  padding: 1rem;
  & > :not(:first-child) {
    padding-top: 0.25rem;
  }
`;

interface ImageProps {
  photos: Photo[];
}

const RoomImage = ({ photos }: ImageProps): ReactElement => {
  return (
    <ImageWrapper>
      {/* TODO: image caption */}
      <Image
        src={
          photos.length
            ? photos[0].link
            : "https://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/zbr9m61suuhkvo74tsxt.webp"
        }
        layout="fill"
        alt="image caption"
        objectFit="cover"
      />

      <RatingButton rightIcon={<AiOutlineStar size="1.3rem" />}>
        5.00
      </RatingButton>
      <HeartButton
        aria-label="Save room"
        icon={<AiOutlineHeart size="1.3rem" />}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled(Box)`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: inherit;
  overflow: hidden;
`;

const RatingButton = styled(ButtonOpaque)`
  position: absolute;
  top: 0.4em;
  left: 0.4em;
`;

const HeartButton = styled(IconButtonClear)`
  position: absolute;
  top: 0.4em;
  right: 0.4em;
`;
