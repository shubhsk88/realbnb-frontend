import { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import {
  Button,
  Stat,
  StatNumber,
  Text,
  HStack,
  VStack,
  Select,
  StackProps,
} from "@chakra-ui/react";
import BeatLoader from "react-spinners/BeatLoader";

import { Room } from "../generated";
import { isLoggedInVar } from "../lib/cache";
import { usePaymentDetails } from "./context/PaymentContext";

import { DateRangePickerComponent } from "./DatePicker";
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
  const router = useRouter();

  const [_, setPaymentDetails] = usePaymentDetails();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rangeDates, setRangesDate] = useState<RangeProps>({
    start: null,
    end: null,
  });
  const [numDays, setNumDays] = useState(0);
  const [guest, setGuest] = useState<string | undefined>();

  useEffect(() => {
    const { start, end } = rangeDates;
    setNumDays(start && end ? differenceInCalendarDays(end, start) : 0);
  }, [rangeDates]);

  const goToCheckout = () => {
    setPaymentDetails({
      room,
      reservation: {
        checkIn: rangeDates.start,
        checkOut: rangeDates.end,
        days: numDays,
        guest,
        total: 200,
      },
    });
    router.push(`/${room.id}/checkout`);
  };

  const handleBooking = () => {
    setIsLoading(true);
    isLoggedInVar() ? goToCheckout() : setIsLoginOpen(true);
  };

  const onClose = () => {
    setIsLoginOpen(false);
    isLoggedInVar() ? goToCheckout() : setIsLoading(false);
  };

  return (
    <>
      {isLoginOpen ? (
        <AuthModal isLoginOpen={isLoginOpen} onLoginClose={onClose} />
      ) : null}

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
              <Text>
                ${room.price} x {numDays} nights
              </Text>
              <Stat flexGrow={0} size="xl">
                <StatNumber color="primary">${numDays * 20}</StatNumber>
              </Stat>
            </HStack>
            <Button
              w="100%"
              colorScheme="gray"
              onClick={handleBooking}
              isLoading={isLoading}
              spinner={<BeatLoader size={9} color="black" />}
            >
              Book Now
            </Button>
          </>
        ) : null}
      </VStack>
    </>
  );
};
