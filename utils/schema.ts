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

export const verficationCode = yup.object().shape({
  verificationCode: yup
    .string()
    .test("len", "Must be of 4 number", (val) => val.length === 4)
    .matches(/([0-9]{4})/, "The verification should only contains Number"),
});
