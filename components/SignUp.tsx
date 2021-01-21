import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { phoneSchema, verficationCode } from "../utils";
import { ButtonPrimary } from "./common";
import countries from "./constants/countries";
import { useStartPhoneVerificationMutation } from "../generated";

type PhoneState = "VERIFICATION" | "START" | "COMPLETE";
interface Phone {
  countryCode: string;
  phone: string;
}
interface Code {
  verificationCode: string;
}
export const SignUp = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<Phone>({
    resolver: yupResolver(phoneSchema),
    mode: "onBlur",
  });
  const {
    register: verifyRegister,
    handleSubmit: verifyHandleSubmit,
    errors: verifyErrors,
  } = useForm<Code>({
    resolver: yupResolver(verficationCode),
    mode: "onBlur",
  });

  const [modalState, setModalState] = useState<PhoneState>("START");
  const [
    onVerify,
    { data, error, loading },
  ] = useStartPhoneVerificationMutation({
    onCompleted: ({ startPhoneVerification }) => {
      if (startPhoneVerification.ok) {
        toast({
          title: "Verification Code Sent",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      }
    },
  });
  const onVerifyCode = (data) => {
    console.log(data);
  };

  const onSubmit = (inputData: Phone) => {
    onVerify({
      variables: { phoneNumber: `${inputData.countryCode}${inputData.phone}` },
    });
  };

  return (
    <>
      {modalState === "START" ? (
        <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
          <FormControl isRequired id="countryCode">
            <FormLabel>Phone Number</FormLabel>
            <Select
              name="countryCode"
              focusBorderColor="primary"
              placeholder="Select Country Code"
              ref={register}
            >
              {countries.map((country) => (
                <option
                  value={country.dial_code}
                  key={country.code}
                >{`${country.name}    ${country.dial_code}   ${country.flag}`}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl
            isInvalid={Boolean(errors.phone?.message)}
            isRequired
            id="phone"
          >
            <Input
              type="number"
              name="phone"
              ref={register}
              placeholder="Enter your phone Number"
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
          <ButtonPrimary type="submit" w="100%" my={6}>
            Continue
          </ButtonPrimary>
        </VStack>
      ) : null}
      {modalState === "VERIFICATION" ? (
        <VStack as="form" onSubmit={verifyHandleSubmit(onVerifyCode)}>
          <FormControl
            isInvalid={Boolean(verifyErrors?.verificationCode?.message)}
            isRequired
            id="phone"
          >
            <Input
              type="number"
              name="verificationCode"
              ref={verifyRegister}
              placeholder="Enter your Verification Code here"
            />
            <FormErrorMessage>
              {verifyErrors?.verificationCode?.message}
            </FormErrorMessage>
            <ButtonPrimary type="submit" w="100%" my={6}>
              Verify
            </ButtonPrimary>
            Didn't receive your Code?{" "}
            <Button variant="link">Resend it here</Button>
          </FormControl>
        </VStack>
      ) : null}
      <Text> OR</Text>
      <Button> Continue With Email</Button>
    </>
  );
};
