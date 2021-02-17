import { gql } from "@apollo/client";

export const PAYMENT_DETAILS = gql`
  query PaymentDetails {
    paymentDetails @client
  }
`;
