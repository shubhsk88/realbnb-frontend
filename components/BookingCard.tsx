import { ReactElement } from "react";
import { Box, BoxProps, Button, Select } from "@chakra-ui/react";

export const BookingCard = ({ ...props }: BoxProps): ReactElement => {
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
