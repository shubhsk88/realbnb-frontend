import { ReactElement } from "react";
import { Button } from "@chakra-ui/react";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";

import { useGoogleAuthMutation } from "../../generated";
import { GoogleIcon } from "../common";

interface GoogleProps {
  onSuccess: (string) => void;
  onError: (string) => void;
}

export const GoogleSignIn = ({
  onSuccess,
  onError,
}: GoogleProps): ReactElement => {
  // TODO: Pass up data & mutation errors, mutation loading state
  const [onGoogleLogin] = useGoogleAuthMutation({
    onCompleted: ({ googleAuth }) => {
      onSuccess(googleAuth.token);
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
      onFailure={({ error }) => onError(error)}
      cookiePolicy={"single_host_origin"}
    />
  );
};
