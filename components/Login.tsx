import { useForm } from "react-hook-form";
import { ModalComponent } from "./common/ModalComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Box,
} from "@chakra-ui/react";
import { ButtonPrimary } from "./common";

export const Login = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(errors);
    console.log(data);
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
            placeholder="Password"
            ref={register}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Box w="100%" textAlign="center">
          <ButtonPrimary type="submit" w="80%" mx="auto" my={6}>
            Login
          </ButtonPrimary>
        </Box>
      </form>
    </ModalComponent>
  );
};
