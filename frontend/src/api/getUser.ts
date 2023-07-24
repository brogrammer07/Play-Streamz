import { sendRequest } from "./helper";

import { User } from "../typings";

type UserResult = {
  status: string;
  message: string;
  data: User;
};

export const getUser = () => {
  const queryKey = ["user"];
  const queryFunction = () =>
    sendRequest<UserResult>("get", `/me`).then((res) => res.data);
  return [queryKey, queryFunction] as const;
};
