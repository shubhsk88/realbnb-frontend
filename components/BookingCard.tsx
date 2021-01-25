import { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Button,
  Stat,
  StatNumber,
  Text,
  HStack,
  VStack,
  Select,
  StackProps,
} from "@chakra-ui/react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useReactiveVar } from "@apollo/client";
import { DateRangePickerComponent } from "./DatePicker";
import { Room } from "../generated";
import { isLoggedInVar } from "../lib/cache";

import { AuthModal } from "./Auth/AuthModal";

export interface RangeProps {
  start: Date | null;
  end: Date | null;
}

interface BookingCardProps extends StackProps {
  room: Room;
}

export const BookingCard = ({
  room,
  ...props
}: BookingCardProps): ReactElement => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [isLogin, setIsLogin] = useState(false);
  console.log(isLoggedIn);
  const [rangeDates, setRangesDate] = useState<RangeProps>({
    start: null,
    end: null,
  });
  const [guest, setGuest] = useState<string | undefined>();

  const [numDays, setNumDays] = useState(0);
  useEffect(() => {
    const { start, end } = rangeDates;
    setNumDays(start && end ? differenceInCalendarDays(end, start) : 0);
  }, [rangeDates]);

  const onBooking = (e) => {
    if (!isLoggedIn) setIsLogin(!isLoggedIn);
  };
  const onClose = () => setIsLogin(false);

  return (
    <>
      {isLogin ? <AuthModal isLogin={isLogin} onLoginClose={onClose} /> : null}
      <VStack
        align="stretch"
        spacing={4}
        h="max-content"
        p={5}
        shadow="lg"
        borderRadius="md"
        {...props}
      >
        <HStack>
          <Stat flex={0}>
            <StatNumber color="primary">${room.price}</StatNumber>
          </Stat>

          <Text pl={1} fontSize="xl" color="gray.500">
            / night
          </Text>
        </HStack>
        <DateRangePickerComponent setRange={setRangesDate} />
        <Select
          placeholder="Guests"
          required
          value={guest}
          onChange={(e) => setGuest(e.target.value)}
        >
          {Array.from({ length: 4 }, (_, i) => i + 1).map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>
        {numDays && guest ? (
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
            <Button w="100%" onClick={onBooking} colorScheme="gray">
              Book Now
            </Button>
          </>
        ) : null}
      </VStack>
    </>
  );
};
