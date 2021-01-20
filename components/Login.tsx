import { SubmitHandler, useForm } from "react-hook-form";
import { ModalComponent } from "./common/ModalComponent";
import BeatLoader from "react-spinners/BeatLoader";
import { yupResolver } from "@hookform/resolvers/yup";
import { env, loginSchema } from "../utils";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Button,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ButtonPrimary, ErrorDialog } from "./common";
import { ReactElement, useEffect, useState } from "react";
import { useEmailLoginMutation, useGoogleAuthMutation } from "../generated";
import { isLoggedInVar } from "../lib/cache";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { GoogleIcon } from "../styles/theme";

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
  const [onGoogleLogin] = useGoogleAuthMutation({
    onCompleted: ({ googleAuth }) => {
      if (typeof window !== "undefined" && googleAuth.token) {
        localStorage.setItem("token", googleAuth.token as string);
        isLoggedInVar(true);

        toast({
          title: "Successfully logged in",
          status: "success",
          duration: 4000,
        });
      }
    },
  });
  const successResponseGoogle = (response: GoogleLoginResponse) => {
    const { name, email, imageUrl, googleId } = response.profileObj;
    onGoogleLogin({
      variables: {
        name,
        email,
        imageUrl,
        googleId,
      },
    });
  };
  const errorResponseGoogle = (response) => {
    console.log(response);
  };

  return (
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
      {data?.emailSignIn?.error ? (
        <ErrorDialog error={data.emailSignIn.error} />
      ) : null}
      <ButtonPrimary
        isLoading={loading}
        loadingText="Submitting"
        spinner={<BeatLoader size={4} color="white" />}
        type="submit"
        w="100%"
        my={6}
      >
        Login
      </ButtonPrimary>
      <VStack spacing={4}>
        <Text>or</Text>
        <GoogleLogin
          clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
          render={(renderProps) => (
            <Button
              leftIcon={<GoogleIcon />}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              color="gray.900"
              fontWeight="medium"
              backgroundColor="white"
              w="100%"
              size="md"
              _hover={{ bg: "gray.100" }}
              _active={{ bg: "gray.200", transform: "scale(0.95)" }}
              variant="outline"
            >
              Sign In With Google
            </Button>
          )}
          buttonText="Login"
          onSuccess={successResponseGoogle}
          onFailure={errorResponseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        
      </VStack>
    </form>
  );
};
