import { useState, useContext, createContext, ReactElement, FC } from "react";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  useEmailLoginMutation,
  useGetUserQuery,
  useGoogleAuthMutation,
} from "@/generated";
import { isLoggedInVar } from "./cache";
import { useToast } from "@chakra-ui/react";

export function ProvideAuth({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const authContext = createContext(null);
export const useAuth = (): any => {
  return useContext(authContext);
};

export interface onLoginVariables {
  variables: {
    email: string;
    password: string;
  };
}
export interface SignInWithEmailReturn {
  onLogin: ({ variables }: onLoginVariables) => void;
  error: string;
  loading: boolean;
}
export function useProvideAuth() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const client = useApolloClient();
  const router = useRouter();
  const toast = useToast();

  const signIn = (resolver, callback: () => void) => {
    if (resolver.token) {
      Cookies.set("token", resolver.token);
      isLoggedInVar(true);
      callback();
    } else {
      setError(resolver.error);
    }
  };

  const signInWithEmail = (callback: () => void): SignInWithEmailReturn => {
    const [onLogin, { error: serverError, loading }] = useEmailLoginMutation({
      refetchQueries: ["getUser"],
      onCompleted: ({ emailSignIn }) => {
        signIn(emailSignIn, callback);
      },
    });
    if (serverError) setError("Unknown error occurred,Please Try again");

    return { onLogin, error, loading };
  };

  const signInWithGoogle = (callback: () => void) => {
    const [
      onGoogleLogin,
      { error: serverError, loading },
    ] = useGoogleAuthMutation({
      refetchQueries: ["getUser"],
      onCompleted: ({ googleAuth }) => {
        signIn(googleAuth, callback);
      },
    });
    if (serverError) setError("Unknown error occurred,Please Try again");

    return { onGoogleLogin, error, loading };
  };

  const getUser = () => {
    const { data, error, loading } = useGetUserQuery();

    return { user: data?.profile.user, error, loading };
  };

  const logout = () => {
    client.cache.evict({ fieldName: "token" });
    client.cache.gc();

    Cookies.remove("token");

    isLoggedInVar(false);

    toast({
      title: "Successfully logged out",
      status: "success",
      duration: 4000,
      position: "bottom-left",
    });

    router.push("/");
  };

  return { signInWithEmail, signInWithGoogle, logout, getUser };
}
