import {
  ActionCodeSettings,
  Auth,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";
import { useCallback, useState } from "react";

type CreateUserOptions = {
  emailVerificationOptions?: ActionCodeSettings;
  sendEmailVerification?: boolean;
};

export type AuthActionHook<M> = [M, boolean];

export type EmailAndPasswordActionHook = AuthActionHook<
  (email: string, password: string) => Promise<UserCredential | undefined>
>;

export default (
  auth: Auth,
  options?: CreateUserOptions
): EmailAndPasswordActionHook => {
  const [loading, setLoading] = useState<boolean>(false);

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
        return user;
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    },
    [auth, options]
  );

  return [createUserWithEmailAndPassword, loading];
};
