import { Box, Select, Button, BoxProps } from "@chakra-ui/react";

interface BookingProps {
  props: BoxProps;
}

export const BookingCard = ({ ...props }) => {
  return (
    <Box minWidth="300px" {...props}>
      <Box p={5} shadow="md" borderRadius="10px">
        <Select placeholder="" focusBorderColor="primary" />
        <Button w="100%" colorScheme="gray">
          Book Now
        </Button>
      </Box>
    </Box>
  );
};
