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
} from "@chakra-ui/react";

import { useEmailLoginMutation } from "@/generated";
import { isLoggedInVar } from "@/lib/cache";
import { loginSchema } from "@/utils";
import { GoogleSignIn } from "./GoogleSignIn";
import { ButtonPrimary, ErrorDialog } from "./../common";

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

  const onSuccess = (token: string) => {
    if (typeof window !== undefined && token) {
      localStorage.setItem("token", token);
      isLoggedInVar(true);

      toast({
        title: "Logged in successfully",
        status: "success",
        duration: 6000,
        position: "bottom-left",
      });

      reset();
      closeModal();
    }
  };

  const [onLogin, { data, error, loading }] = useEmailLoginMutation({
    onCompleted: ({ emailSignIn }) => {
      onSuccess(emailSignIn.token);
    },
  });

  const onSubmit: SubmitHandler<LoginInputData> = (inputData) => {
    onLogin({ variables: inputData });
  };

  const [errorMsg, setErrorMsg] = useState("");

  const onError = (msg: string) => {
    setErrorMsg(msg);
  };

  useEffect(() => {
    if (error?.message) {
      setErrorMsg(error.message);
    } else if (data?.emailSignIn?.error) {
      setErrorMsg(data?.emailSignIn?.error);
    } else {
      setErrorMsg("");
    }
  }, [data, error]);

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

        {errorMsg ? <ErrorDialog error={errorMsg} /> : null}

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
