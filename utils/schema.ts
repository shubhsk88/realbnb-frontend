import * as yup from "yup";
import { phoneNumberValidation } from "../components/constants/regex";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email Address is required")
    .email("Email address is invalid"),
  password: yup.string().required("Password is required"),
});

const phoneError = "Phone number is not valid";
export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone Number is Required")
    .min(10, phoneError)
    .matches(phoneNumberValidation, phoneError),
  countryCode: yup.string(),
});
