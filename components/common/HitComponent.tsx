import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Room } from "../../generated";

interface Hit {
  hit: Room;
}
export const HitComponent = ({ hit }: Hit) => {
  console.log(hit);
  return (
    <Link href={`/rooms/${hit.id}`}>
      <a>
        <HStack spacing={2} px={4} _hover={{ backgroundColor: "gray.100" }}>
          <Image
            src={hit.photos[0]?.link ?? "https://via.placeholder.com/150"}
            width={100}
            height={100}
          />
          <Box>
            <Text fontWeight="bold">{hit.name}</Text>
            <Text>{hit.address.address}</Text>
          </Box>
        </HStack>
      </a>
    </Link>
  );
};
