import { ReactElement } from "react";
import {
  Box,
  Flex,
  Heading,
  Icon,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { IoBedOutline } from "react-icons/io5";
import { Room } from "@/generated";
import { ButtonOpaque, IconPair, Image } from "@/components/common";
import { SavedListModal } from "./SavedListModal";

interface CardProps extends StackProps {
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
      <Image photo={room.photos[0]} h="200px" w="full">
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
      <Box flexGrow={1}>
        <Link href={`/rooms/${room.id}`}>
          <a>
            <VStack as="section" h="full" align="stretch" spacing={2} p={4}>
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

                  <Text textStyle="monetary">${room.price}</Text>
                </Box>
              </Flex>
            </VStack>
          </a>
        </Link>
      </Box>
    </VStack>
  );
};
