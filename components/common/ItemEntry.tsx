import { ReactElement } from "react";
import { Box, HStack, StackProps } from "@chakra-ui/react";

import { Photo } from "@/generated";
import { Image } from "./Image";

interface ItemEntryProps extends StackProps {
  photo?: Photo | undefined;
  image?: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

export const ItemEntry = ({
  photo,
  image,
  children,
  ...props
}: ItemEntryProps): ReactElement => (
  <HStack
    py={2}
    px={6}
    spacing={8}
    _hover={{ backgroundColor: "gray.100" }}
    {...props}
  >
    {image ? (
      <Box boxSize={20} overflow="none" borderRadius="md">
        {image}
      </Box>
    ) : (
      /* TODO: tune image props */
      <Image boxSize={20} photo={photo} objectFit="cover" borderRadius="md" />
    )}

    <div>{children}</div>
  </HStack>
);
