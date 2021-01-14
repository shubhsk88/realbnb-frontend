import { Box, Flex, Link, Icon } from "@chakra-ui/react";
import { ReactElement } from "react";
import { BsSearch } from "react-icons/bs";
import { ButtonPrimary } from "./shared";
export const Header = (): ReactElement => {
  return (
    <Box shadow="lg">
      <Box maxW="1200px" mx="auto">
        <Flex justifyContent="space-between" h="5rem" alignItems="center">
          <Icon as={BsSearch} />
          <Box fontWeight="bold">
            <Link mr={24}>Booking</Link>
            <Link mr={24}>Saved</Link>
            <ButtonPrimary>
              <Link>Login</Link>
            </ButtonPrimary>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
