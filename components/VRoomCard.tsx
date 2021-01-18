import { ReactElement } from "react";
import styled from "@emotion/styled";

import {
  Box,
  BoxProps,
  Heading,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { Photo, Room } from "../generated";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";

import { ButtonOpaque, IconButtonClear, IconPair } from "./common";

interface CardProps extends BoxProps {
  room: Room;
}

export const VRoomCard = ({ room, ...props }: CardProps): ReactElement => {
  return (
    <VStack
      h="100%"
      bgColor="gray.50"
      boxShadow="lg"
      borderRadius="lg"
      overflow="hidden"
      align="stretch"
      {...props}
    >
      <RoomImage photo={room.photos[0]} />

      <VStack as="section" flexGrow={1} align="stretch" spacing={2} p={4}>
        <Text size="xs" fontWeight="medium" color="gray.400">
          {room.roomType.name}
        </Text>
        <Heading as="h3" size="md">
          {room.name}
        </Heading>
        <Text>{room.description}</Text>

        <Box mt="auto">
          <IconPair icon={IoBedOutline} my={3}>
            {room.beds}
          </IconPair>

          {/* Current bug breaks StatNumber
            <StatNumber color="primary">${room.price}</StatNumber>
            */}

          {/* FIXME: primary needs to be properly defined (ButtonPrimary -> Secondary) */}
          <Text fontWeight="extrabold" fontSize="2xl" color="primary">
            ${room.price}
          </Text>
        </Box>
      </VStack>
    </VStack>
  );
};

interface ImageProps {
  photo: Photo;
}

const RoomImage = ({ photo }: ImageProps): ReactElement => {
  return (
    <Skeleton isLoaded={!!photo}>
      <ImageWrapper>
        {photo && (
          <>
            {/* TODO: image caption */}
            <Image
              src={photo.link}
              alt={photo.caption}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />

            {/* TODO: add average rating data */}
            <RatingButton rightIcon={<AiOutlineStar size="1.3rem" />}>
              5.00
            </RatingButton>
            <HeartButton
              aria-label="Save room"
              icon={<AiOutlineHeart size="1.3rem" />}
            />
          </>
        )}
      </ImageWrapper>
    </Skeleton>
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