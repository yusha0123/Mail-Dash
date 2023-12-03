import {
  ActionCodeSettings,
  Auth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

type CreateUserOptions = {
  emailVerificationOptions?: ActionCodeSettings;
  sendEmailVerification?: boolean;
};

export type AuthActionHook<M> = [M, boolean, string | undefined];

type EmailAndPasswordActionHook = AuthActionHook<
  (email: string, password: string) => Promise<UserCredential | undefined>
>;

export default (
  auth: Auth,
  options?: CreateUserOptions
): EmailAndPasswordActionHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const createUserWithEmailAndPassword = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const user = await firebaseCreateUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (options && options.sendEmailVerification && user.user) {
          await sendEmailVerification(
            user.user,
            options.emailVerificationOptions
          );
        }
        toast.success("Registration successful!");
        return user;
      } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          setError("Email already in use!");
        } else if (error.code === "auth/invalid-email") {
          setError("Please enter a valid email!");
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    },
    [auth, options]
  );

  return [createUserWithEmailAndPassword, loading, error];
};
