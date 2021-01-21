import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { phoneSchema } from "../utils";
import { ButtonPrimary } from "./common";
import countries from "./constants/countries";
import { useStartPhoneVerificationMutation } from "../generated";

interface Phone {
  countryCode: string;
  phone: string;
}

export const SignUp = () => {
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

  const [
    onVerify,
    { data, error, loading },
  ] = useStartPhoneVerificationMutation();

  const onSubmit = (inputData: Phone) => {
    onVerify({
      variables: { phoneNumber: `${inputData.countryCode}${inputData.phone}` },
    });
  };

  return (
    <>
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
      <Text> OR</Text>
      <Button> Continue With Email</Button>
    </>
  );
};
