import { Box, Button, IconButton } from "@chakra-ui/react";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
export const CardPrimary = () => {
  return (
    <Box my={4} h="10rem">
      <Box position="relative">
        <Image
          src="https://res.cloudinary.com/dnpwz5gdn/image/upload/v1610472448/zbr9m61suuhkvo74tsxt.webp"
          width={200}
          height={300}
          alt="Image"
        />
        <Button
          position="absolute"
          bottom="20px"
          left="20px"
          rightIcon={<AiOutlineStar />}
        >
          5.00
        </Button>
        <IconButton
          aria-label="button"
          position="absolute"
          right="20px"
          top="20px"
          icon={<AiOutlineHeart />}
        />
      </Box>
    </Box>
  );
};
