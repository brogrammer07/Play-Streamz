import React, { createContext, useContext, useState, useEffect } from "react";
import { signUp } from "../api";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "../api/signIn";
type UserAuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  signUpUser: (
    email: string,
    password: string,
    name: string
  ) => Promise<UserCredential>;
  loginUser: (email: string, password: string) => Promise<UserCredential>;
  loading: boolean;
  logout: () => Promise<void>;
};

const userAuthContext = createContext<UserAuthContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}
export const UserAuthProvider: React.FC<Props> = ({ children }) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const logout = async () => {
    await signOut(auth);
    localStorage.clear();
  };

  const signUpUser = async (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const token = await userCred.user.getIdToken();
        const user = userCred.user;
        await updateProfile(user, {
          displayName: name,
        });
        await signUp({
          email,
          name,
          password,
          isGoogle: false,
          token,
        });
        setCurrentUser(user);
        return userCred;
      }
    );
  };

  const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (user) => {
        return user;
      }
    );
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const response = await signIn();
        if (response) {
          await currentUser!.getIdToken(true);
          queryClient.setQueryData(["user"], response);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signUpUser,
        loading,
        logout,
        loginUser,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};
export const useUserAuth = () => {
  const context = useContext(userAuthContext);

  if (!context) {
    throw new Error("useAuth must be used in <AuthProvider />");
  }

  return context;
};
