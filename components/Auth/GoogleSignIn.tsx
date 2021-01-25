import { ReactElement } from "react";
import { Button, useToast } from "@chakra-ui/react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

import { useGoogleAuthMutation } from "../../generated";
import { isLoggedInVar } from "../../lib/cache";
import { GoogleIcon } from "../common";

export const GoogleSignIn = (): ReactElement => {
  const toast = useToast();

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

  // FIXME: properly handle success & error
  const errorResponseGoogle = (response) => {
    console.log(response);
  };

  return (
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
          Sign in with Google
        </Button>
      )}
      onSuccess={successResponseGoogle}
      onFailure={errorResponseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};
