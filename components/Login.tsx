import { SubmitHandler, useForm } from "react-hook-form";
import { ModalComponent } from "./common/ModalComponent";
import { BeatLoader } from "react-spinners";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { ButtonPrimary } from "./common";
import { useEffect, useState } from "react";
import { useEmailLoginMutation } from "../generated";

export interface LoginInputData {
  email: string;
  password: string;
}
export const Login = () => {
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
  const [onLogin, { data, error, loading }] = useEmailLoginMutation();
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...submittedData });
    }
  }, [isSubmitSuccessful, submittedData, reset]);
  console.log(data, error, loading);
  const onSubmit: SubmitHandler<LoginInputData> = (inputData) => {
    setSubmittedData((prev) => ({ ...prev, inputData }));

    onLogin({ variables: inputData });
  };

  return (
    <ModalComponent name="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <FormErrorMessage>Hello</FormErrorMessage>
        <ButtonPrimary
          isLoading={loading}
          loadingText="Submitting"
          spinner={<BeatLoader size={8} color="white" />}
          type="submit"
          w="100%"
          my={6}
        >
          Login
        </ButtonPrimary>
      </form>
    </ModalComponent>
  );
};
