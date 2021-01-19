import { ReactElement } from "react";
import { Box, BoxProps, Button, Select, Text } from "@chakra-ui/react";
import { DateRangePickerComponent } from "./DatePicker";

export const BookingCard = ({ ...props }: BoxProps): ReactElement => {
  return (
    <Box minWidth="400px" {...props}>
      <Box p={5} shadow="md" borderRadius="10px">
        <Box display="flex" my={4} alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" color="primary">
            $200 
          </Text>
          <Text px={3} fontSize="xl" color="gray.500">
            /1 Night
          </Text>
        </Box>
        <DateRangePickerComponent />
        <Button w="100%" colorScheme="gray">
          Book Now
        </Button>
      </Box>
    </Box>
  );
};
