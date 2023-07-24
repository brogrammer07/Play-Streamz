import { sendRequest } from "./helper";

import { User } from "../typings";

type UserResult = {
  status: string;
  message: string;
  data: User;
};

export const signIn = async () => {
  return sendRequest<UserResult>("post", `/sign-in`).then((res) => res.data);
};
