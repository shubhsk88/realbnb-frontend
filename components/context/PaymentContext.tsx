import {
  createContext,
  useState,
  useContext,
  ReactNode,
  ReactElement,
  SetStateAction,
  Dispatch,
} from "react";
import { Room } from "../../generated";

export interface Reservation {
  checkIn: Date;
  checkOut: Date;
  days: number;
  guest: number;
  total: number;
}
export const PaymentContext = createContext(null);
export interface PaymentProviderProps {
  reservation: Reservation | null;
  room: Room | null;
}

export function PaymentProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [
    reservationDetails,
    setReservationDetails,
  ] = useState<PaymentProviderProps | null>(null);
  const value = [reservationDetails, setReservationDetails];
  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}
export function usePaymentDetails(): [
  PaymentProviderProps,
  Dispatch<SetStateAction<PaymentProviderProps>>
][] {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("useCountState must be used within a CountProvider");
  }
  return context;
}
