import { ReactElement } from "react";
import styled from "@emotion/styled";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Stat,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { Photo, Room } from "@/generated";
import { ButtonOpaque, IconPair } from "@/components/common";
import { SavedListModal } from "./SavedListModal";

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
      <RoomImage roomId={room.id} liked={room.isLiked} photo={room.photos[0]} />

      <Link key={room.id} href={`/rooms/${room.id}`}>
        <a>
          <VStack as="section" flexGrow={1} align="stretch" spacing={2} p={4}>
            <Text textStyle="label">{room.roomType.name}</Text>
            <Heading as="h3" size="md">
              {room.name}
            </Heading>
            <Text>{room.description}</Text>

            <Flex flex={1}>
              <Box mt="auto">
                <IconPair icon={IoBedOutline} mb={1}>
                  {room.beds}
                </IconPair>

                <Stat>
                  <StatNumber color="primary">${room.price}</StatNumber>
                </Stat>
              </Box>
            </Flex>
          </VStack>
        </a>
      </Link>
    </VStack>
  );
};

interface ImageProps {
  roomId: string;
  liked: boolean;
  photo: Photo;
}

const RoomImage = ({ roomId, liked, photo }: ImageProps): ReactElement => {
  return (
    <ImageSkeleton isLoaded={!!photo}>
      {photo && (
        <>
          <Image
            src={photo.link}
            alt={photo.caption}
            layout="fill"
            objectFit="cover"
            loading="lazy"
          />

          {/* TODO: add average rating data */}
          <RatingButton rightIcon={<Icon as={AiOutlineStar} boxSize={5} />}>
            5.00
          </RatingButton>
          <SavedListModal
            roomId={roomId}
            liked={liked}
            pos="absolute"
            top={2}
            right={2}
          />
        </>
      )}
    </ImageSkeleton>
  );
};

const ImageSkeleton = styled(Skeleton)`
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
