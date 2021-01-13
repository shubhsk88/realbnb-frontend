import { Box, Flex, Link, Icon, Button } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { ButtonPrimary } from "./shared";
export const Header = () => {
  return (
    <Box maxW="1200px" w="100%" mx="auto">
      <Flex justifyContent="space-between" h="5rem" alignItems="center">
        <Icon icon={<BsSearch />} />
        <Box fontWeight="bold">
          <Link mr={24}>Booking</Link>
          <Link mr={24}>Saved</Link>
          <ButtonPrimary>
            <Link>Login</Link>
          </ButtonPrimary>
        </Box>
      </Flex>
    </Box>
  );
};
