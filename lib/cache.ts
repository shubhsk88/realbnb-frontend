import { InMemoryCache, makeVar } from "@apollo/client";
import { Room } from "../generated";
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
export const isLoggedInVar = makeVar<boolean>(
  typeof window !== "undefined" && !!localStorage.getItem("token")
);
export const paymentDetailsVar = makeVar<PaymentDetails | null>(null);

export const clientCache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return isLoggedInVar();
          },
        },
        paymetnDetails: {
          read() {
            return paymentDetailsVar();
          },
        },
      },
    },
  },
});
