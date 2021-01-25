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
  useToast,
} from "@chakra-ui/react";

import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { DateRangePickerComponent } from "./DatePicker";

import { Room } from "../generated";
import { isLoggedInVar } from "../lib/cache";

import { AuthModal } from "./Auth/AuthModal";
import { usePaymentDetails } from "./context/PaymentContext";

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
  const toast = useToast();
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = usePaymentDetails();

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
    if (isLoggedIn) {
      setPaymentDetails((prev) => ({
        ...prev,
        room,
        reservation: {
          checkIn: rangeDates.start,
          checkOut: rangeDates.end,
          days: numDays,
          guest,
          total: 200,
        },
      }));
    }
    toast({
      title: "You've been directed to payment hell",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => router.push(`/${room.id}/checkout`), 2000);

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
                <StatNumber color="primary">${numDays * 20}</StatNumber>
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
