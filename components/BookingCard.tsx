import { ReactElement, useState } from "react";
import { Box, BoxProps, Button, Select, Text } from "@chakra-ui/react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { DateRangePickerComponent } from "./DatePicker";

export interface RangeProps {
  start: Date | null;
  end: Date | null;
}
export const BookingCard = ({ ...props }: BoxProps): ReactElement => {
  const [rangeDates, setRangesDate] = useState<RangeProps>({
    start: null,
    end: null,
  });
  const numbeOfDays = useMemo(() => {
    const { start, end } = rangeDates;
  });

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
        <DateRangePickerComponent setRange={setRangesDate} />
        <Button w="100%" colorScheme="gray">
          Book Now {JSON.stringify(rangeDates)}
        </Button>
      </Box>
    </Box>
  );
};
