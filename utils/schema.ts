import { differenceInCalendarYears } from "date-fns";
import * as yup from "yup";
import { phoneNumberValidation } from "../components/constants/regex";

// Validators
const phoneError = "Phone number is not valid";
const phoneNumber = yup
  .string()
  .required("Phone Number is Required")
  .min(10, phoneError)
  .matches(phoneNumberValidation, phoneError);

const email = yup
  .string()
  .required("Email Address is required")
  .email("Email address is invalid");

const password = yup.string().required("Password is required");

export const loginSchema = yup.object().shape({
  email,
  password,
});

export const phoneSchema = yup.object().shape({
  phone: phoneNumber,
  countryCode: yup.string(),
});

export const verificationCode = yup.object().shape({
  verificationCode: yup
    .string()
    .test("len", "Must be of 4 number", (val) => val.length === 4)
    .matches(/([0-9]{4})/, "The verification should only contains Number"),
});

export const phoneSignUp = yup.object().shape({
  email,
  password,
  name: yup.string().required(),
  birthDate: yup
    .string()
    .required()
    .test(
      "birth date",
      "Must be at least 18",
      (val) => differenceInCalendarYears(new Date(), new Date(val)) >= 18
    ),
});
