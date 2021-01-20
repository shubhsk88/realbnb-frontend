import { ReactElement, useState, useEffect } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stat,
  StatNumber,
  Text,
  HStack,
  VStack,
  Select,
} from "@chakra-ui/react";
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

  const [numDays, setNumDays] = useState(0);
  useEffect(() => {
    const { start, end } = rangeDates;
    setNumDays(start && end ? differenceInCalendarDays(end, start) : 0);
  }, [rangeDates]);

  return (
    <Box minWidth="400px" {...props}>
      <Box p={5} shadow="md" borderRadius="10px">
        <VStack align="stretch" spacing={4}>
          <Box display="flex" my={4} alignItems="center">
            <Text fontSize="3xl" fontWeight="bold" color="primary">
              $200
            </Text>
            <Text px={3} fontSize="xl" color="gray.500">
              /1 Night
            </Text>
          </Box>
          <DateRangePickerComponent setRange={setRangesDate} />
          <Select placeholder="Guests">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </Select>
          {numDays ? (
            <>
              <HStack
                justify="space-between"
                mb={10}
                fontSize="xl"
                fontWeight="bold"
              >
                <Text>$200 x {numDays} nights</Text>
                <Stat flexGrow={0} size="xl">
                  <StatNumber color="primary">${numDays * 200}</StatNumber>
                </Stat>
              </HStack>
              <Button w="100%" colorScheme="gray">
                Book Now
              </Button>
            </>
          ) : null}
        </VStack>
      </Box>
    </Box>
  );
};
