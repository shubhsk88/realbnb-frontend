import { InMemoryCache, makeVar } from "@apollo/client";
import { Room } from "@/generated";
import Cookies from "js-cookie";
export interface Reservation {
  checkIn: Date;
  checkOut: Date;
  days: number;
  guest: number;
  total: number;
}
export interface PaymentDetails {
  reservation: Reservation | null;
  room: Room | null;
}

export const isLoggedInVar = makeVar<boolean>(!!Cookies.get("token"));

export const paymentDetailsVar = makeVar<PaymentDetails>(
  typeof window !== "undefined" &&
    localStorage.getItem("paymentDetails") &&
    JSON.parse(localStorage.getItem("paymentDetails"))
);

export const clientCache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        paymentDetails: {
          read() {
            return paymentDetailsVar();
          },
        },
      },
    },
  },
});
