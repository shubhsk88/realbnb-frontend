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

import { useEmailLoginMutation } from "../../generated";
import { isLoggedInVar } from "../../lib/cache";
import { loginSchema } from "../../utils";
import { GoogleSignIn } from "./GoogleSignIn";
import { ButtonPrimary, ErrorDialog } from "./../common";

export interface LoginInputData {
  email: string;
  password: string;
}

export const Login = (): ReactElement => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    formState: { isSubmitSuccessful },
  } = useForm<LoginInputData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const [submittedData, setSubmittedData] = useState<LoginInputData>(getValues);
  const [onLogin, { data, error, loading }] = useEmailLoginMutation({
    onCompleted: ({ emailSignIn }) => {
      if (typeof window !== "undefined" && emailSignIn.token) {
        localStorage.setItem("token", emailSignIn.token as string);
        isLoggedInVar(true);

        toast({
          title: "Successfully logged in",
          status: "success",
          duration: 4000,
        });
      }
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);

  const onSubmit: SubmitHandler<LoginInputData> = (inputData) => {
    setSubmittedData((prev) => ({ ...prev, inputData }));
    onLogin({ variables: inputData });
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

        {data?.emailSignIn?.error ? (
          <ErrorDialog error={data.emailSignIn.error} />
        ) : null}

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
        <GoogleSignIn />
      </VStack>
    </>
  );
};
