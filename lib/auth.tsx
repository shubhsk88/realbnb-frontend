import { useState, useContext, createContext } from "react";
import { EmailLoginMutation, Exact, useEmailLoginMutation } from "@/generated";
import { isLoggedInVar } from "./cache";
import Cookies from "js-cookie";

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const authContext = createContext(null);
export const useAuth = () => {
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
  const signInWithEmail = (callback: () => void): SignInWithEmailReturn => {
    const [onLogin, { error: serverError, loading }] = useEmailLoginMutation({
      onCompleted: ({ emailSignIn }) => {
        if (emailSignIn.token) {
          Cookies.set("token", emailSignIn.token);
          isLoggedInVar(true);
          callback();
        } else {
          setError(emailSignIn.error);
        }
      },
    });
    if (serverError) setError("Unknown error occured,Please Try again");

    return { onLogin, error, loading };
  };
  return { signInWithEmail };
}
