import { ReactElement, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

import BeatLoader from "react-spinners/BeatLoader";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import { loginSchema } from "@/utils";
import { GoogleSignIn } from "./GoogleSignIn";
import { ButtonPrimary, ErrorDialog } from "./../common";
import { useAuth } from "@/lib/auth";

export interface LoginInputData {
  email: string;
  password: string;
}

interface LoginProps {
  closeModal: () => void;
}

export const Login = ({ closeModal }: LoginProps): ReactElement => {
  const toast = useToast();
  const { register, handleSubmit, errors, reset } = useForm<LoginInputData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const { signInWithEmail } = useAuth();

  const onSuccess = () => {
    toast({
      title: "Logged in successfully",
      status: "success",
      duration: 6000,
      position: "bottom-left",
    });

    reset();
    closeModal();
  };
  const { onLogin, error, loading } = signInWithEmail(onSuccess);

  const onSubmit: SubmitHandler<LoginInputData> = (inputData) => {
    onLogin({ variables: inputData });
  };

  const [errorMsg, setErrorMsg] = useState("");

  const onError = (msg: string) => {
    setErrorMsg(msg);
  };

  return (
    <>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl
          id="email"
          isRequired
          isInvalid={Boolean(errors.email?.message)}
        >
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            focusBorderColor="primary"
            ref={register}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="password"
          isRequired
          isInvalid={Boolean(errors.password?.message)}
        >
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            focusBorderColor="primary"
            placeholder="Password"
            ref={register}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        {error ? <ErrorDialog error={error} /> : null}

        <ButtonPrimary
          isLoading={loading}
          spinner={<BeatLoader size={4} color="white" />}
          type="submit"
          w="100%"
        >
          Login
        </ButtonPrimary>
      </VStack>

      <VStack mt={3} spacing={3}>
        <Text>or</Text>
        <GoogleSignIn onSuccess={onSuccess} onError={onError} />
      </VStack>
    </>
  );
};
