import { ReactElement } from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Icon,
  Stat,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { Room } from "@/generated";
import { ButtonOpaque, IconPair, Image } from "@/components/common";
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
      {/* TODO: flatten bottom left & right radius on img */}
      <Image photo={room.photos[0]} h="200px" w="100%">
        {/* FIXME: add average rating data */}
        <ButtonOpaque
          rightIcon={<Icon as={AiOutlineStar} boxSize={5} />}
          pos="absolute"
          top={2}
          left={2}
        >
          5.00
        </ButtonOpaque>
        <SavedListModal
          roomId={room.id}
          liked={room.isLiked}
          pos="absolute"
          top={2}
          right={2}
        />
      </Image>

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

                {/* TODO: Create price textStyle instead */}
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
