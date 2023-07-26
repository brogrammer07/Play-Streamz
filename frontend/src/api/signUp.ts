import { sendRequest } from "./helper";

import { Channel } from "../typings";

type UserResult = {
  status: string;
  message: string;
  data: {
    email: string;
    name: string;
    profileUrl?: string;
    userId: string;
    isGoogle: boolean;
  };
};

interface signUpProps {
  name: string;
  email: string;
  profileUrl?: string;
  password: string;
  isGoogle: boolean;
  token: string;
}

export const signUp = async (props: signUpProps) => {
  return sendRequest<UserResult>("post", `/sign-up`, {
    ...props,
  }).then((res) => res.data);
};
