import { ReactElement } from "react";
import Link from "next/link";
import { Heading, Text } from "@chakra-ui/react";

import { Room } from "@/generated";
import { ItemEntry } from "../common";

interface HitProps {
  hit: Room;
}

//TODO: items should be a focusable link wrapper
export const Hit = ({ hit }: HitProps): ReactElement => (
  <Link href={`/rooms/${hit.id}`}>
    <a>
      <ItemEntry photo={hit.photos[0]}>
        <Heading as="h5" textStyle="labelDark">
          {hit.name}
        </Heading>
        <Text textStyle="labelMedium">{hit.address.address}</Text>
      </ItemEntry>
    </a>
  </Link>
);
