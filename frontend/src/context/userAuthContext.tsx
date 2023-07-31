import React, { createContext, useContext, useState, useEffect } from "react";
import { signUp } from "../api";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useQueryClient } from "@tanstack/react-query";
import { signIn } from "../api/signIn";
import { User } from "../typings";
type UserAuthContextType = {
  channelId: string | null;
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
  googleSignIn: () => Promise<UserCredential>;
  googleSignUp: () => Promise<UserCredential>;
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
  const [channelId, setChannelId] = useState<string | null>(null);
  const provider = new GoogleAuthProvider();
  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    localStorage.clear();
  };

  const signUpUser = async (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCred) => {
        const token = await userCred.user.getIdToken();
        await signUp({
          email,
          name,
          password,
          isGoogle: false,
          token,
        });
        return userCred;
      }
    );
  };

  const loginUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignUp = async () => {
    return signInWithPopup(auth, provider).then(async (userCred) => {
      const token: string = await userCred.user.getIdToken();
      const user = userCred.user;
      await signUp({
        email: user.email as string,
        name: user.displayName as string,
        profileUrl: user.photoURL ? user.photoURL : undefined,
        isGoogle: true,
        token,
      }).then((response) => setCurrentUser(response.data));
      return userCred;
    });
  };

  const googleSignIn = async () => {
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const response = await signIn();
        if (response.data) {
          await currentUser!.getIdToken(true);
          setCurrentUser(response.data);
          setLoading(false);
        }
      } else setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        currentUser,
        channelId,
        setCurrentUser,
        signUpUser,
        loading,
        logout,
        loginUser,
        googleSignUp,
        googleSignIn,
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
