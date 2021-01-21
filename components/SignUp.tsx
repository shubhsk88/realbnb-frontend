import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

import {
  useStartPhoneVerificationMutation,
  useCompletePhoneVerificationMutation,
  useCreateUserViaPhoneMutation,
} from "../generated";
import { isLoggedInVar } from "../lib/cache";
import { phoneSchema, phoneSignUp, verificationCode } from "../utils";
import { ButtonPrimary } from "./common";
import countries from "./constants/countries";

type PhoneState = "START" | "VERIFY" | "VERIFIED";
interface Phone {
  countryCode: string;
  phone: string;
}
interface Code {
  verificationCode: string;
}
export const SignUp = () => {
  const toast = useToast();

  const [phoneState, setPhoneState] = useState<string>("");

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
    resolver: yupResolver(verificationCode),
    mode: "onBlur",
  });

  const [
    onCompleteVerification,
    { data: verificationResponse },
  ] = useCompletePhoneVerificationMutation({
    onCompleted: ({ isPhoneVerified }) => {
      if (isPhoneVerified.ok) {
        toast({
          title: "Code Verification successfully",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setModalState("VERIFIED");
      } else {
        setVerificationError(isPhoneVerified.error);
      }
    },
  });

  const [modalState, setModalState] = useState<PhoneState>("START");
  const [verificationError, setVerificationError] = useState("");
  const [onVerify, { data }] = useStartPhoneVerificationMutation({
    onCompleted: ({ startPhoneVerification }) => {
      if (startPhoneVerification.ok) {
        toast({
          title: "Verification Code Sent",
          status: "success",
          duration: 1000,
          isClosable: true,
        });

        setModalState("VERIFY");
      }
    },
  });

  const onVerifyCode = (data: Code) => {
    onCompleteVerification({
      variables: {
        phoneNumber: phoneState,
        verificationCode: data.verificationCode,
      },
    });
  };

  const onSubmit = (inputData: Phone) => {
    const phoneNumber = `${inputData.countryCode}${inputData.phone}`;
    setPhoneState(phoneNumber);
    onVerify({
      variables: { phoneNumber },
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
      {modalState === "VERIFY" ? (
        <VStack
          as="form"
          spacing={4}
          onSubmit={verifyHandleSubmit(onVerifyCode)}
        >
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
          </FormControl>
          {verificationError ? (
            <Alert borderRadius={4} status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Your Verification Code is Invalid</AlertTitle>

              <CloseButton
                onClick={() => setVerificationError("")}
                position="absolute"
                right="8px"
                top="8px"
              />
            </Alert>
          ) : null}
          <ButtonPrimary type="submit" w="100%" mb={4}>
            Verify
          </ButtonPrimary>
          Didn&rsquo;t receive your Code?{" "}
          <Button variant="link">Resend code</Button>
        </VStack>
      ) : null}
      {modalState === "VERIFIED" ? (
        <PhoneSignUp phoneNumber={phoneState} />
      ) : null}

      <Text>or</Text>
      <Button>Continue With Email</Button>
    </>
  );
};

interface PhoneSignUpForm {
  email: string;
  password: string;
  name: string;
  birthDate: string;
}

interface PhoneSignUpProps {
  phoneNumber: string;
}

const PhoneSignUp = ({ phoneNumber }: PhoneSignUpProps) => {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<PhoneSignUpForm>({
    resolver: yupResolver(phoneSignUp),
    mode: "onBlur",
  });

  const [mutationError, setMutationError] = useState("");
  const [onSignUp, { data, error, loading }] = useCreateUserViaPhoneMutation({
    onCompleted: ({ createUserViaPhone }) => {
      if (createUserViaPhone.ok) {
        localStorage.setItem("token", createUserViaPhone.token as string);
        isLoggedInVar(true);

        toast({
          title: "Successfully created account",
          status: "success",
          duration: 4000,
        });
      } else {
        setMutationError(createUserViaPhone.error);
      }
    },
  });

  const onSubmit = (formData: PhoneSignUpForm) => {
    onSignUp({ variables: { phone: phoneNumber, ...formData } });
  };

  const fields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "Name",
      name: "name",
      type: "text",
    },
    {
      label: "Birth Date",
      name: "birthDate",
      type: "date",
    },
  ];

  return (
    <VStack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => (
        <FormControl key={field.label} isRequired>
          <FormLabel>{field.label}</FormLabel>
          <Input type={field.type} name={field.name} ref={register} />
          {errors[field.name] ? (
            <FormErrorMessage>{errors[field.name].message}</FormErrorMessage>
          ) : null}
        </FormControl>
      ))}
      {mutationError ? (
        <Alert>
          <AlertTitle mr={2}>{mutationError}</AlertTitle>
          <CloseButton
            onClick={() => setMutationError("")}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      ) : null}

      <ButtonPrimary type="submit">Create Account</ButtonPrimary>
    </VStack>
  );
};
