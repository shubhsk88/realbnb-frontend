import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactElement } from "react";

interface StripeWrapperProps {
  children: JSX.Element | JSX.Element[];
}

export const StripeWrapper = ({
  children,
}: StripeWrapperProps): ReactElement => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_ID);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};
