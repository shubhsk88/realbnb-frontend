import { ReactElement } from "react";
import styled from "@emotion/styled";

import { Box, HStack, Skeleton, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

import { Room } from "@/generated/";

interface Hit {
  hit: Room;
}

//TODO: items should be a focusable link wrapper
export const Hit = ({ hit }: Hit): ReactElement => {
  const photo = hit.photos[0];

  return (
    <Box px={2} py={2} _hover={{ backgroundColor: "gray.100" }}>
      <Link href={`/rooms/${hit.id}`}>
        <a>
          <HStack spacing={2}>
            <ImageWrapper isLoaded={!!photo} borderRadius="md">
              {photo ? (
                <Image src={photo.link} layout="fill" objectFit="cover" />
              ) : null}
            </ImageWrapper>

            <Box flex={1}>
              <Box w="max-content" mx="auto">
                <Text fontWeight="bold">{hit.name}</Text>
                <Text>{hit.address.address}</Text>
              </Box>
            </Box>
          </HStack>
        </a>
      </Link>
    </Box>
  );
};

const ImageWrapper = styled(Skeleton)`
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;
