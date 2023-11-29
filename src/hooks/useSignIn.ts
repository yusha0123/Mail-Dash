import {
  Auth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";

export type AuthActionHook<M> = [M, boolean, string | undefined];

export type EmailAndPasswordActionHook = AuthActionHook<
  (email: string, password: string) => Promise<UserCredential | undefined>
>;

export default (auth: Auth): EmailAndPasswordActionHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const signInWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      setLoading(true);

      try {
        const user = await firebaseSignInWithEmailAndPassword(
          auth,
          email,
          password
        );

        return user;
      } catch (err: any) {
        if (err.code === "auth/invalid-login-credentials") {
          setError("Invalid credentials!");
        } else if (err.code === "auth/invalid-email") {
          setError("Please enter a valid email!");
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  return [signInWithEmailAndPassword, loading, error];
};
