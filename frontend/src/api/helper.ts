import axios, { AxiosResponse } from "axios";
import globals from "../Config/globals.config";
import ErrorAlert from "../utils/ErrorAlert";
import { auth } from "../firebase/firebase";

type Client = <T = any>(
  method: string,
  url: string,
  body?: any,
  options?: any
) => Promise<AxiosResponse<T>>;

export const sendRequest: Client = async (
  method: string,
  url: string,
  body?: any,
  options?: any
) => {
  let token = null;
  token = await auth.currentUser!.getIdToken();

  return axios({
    method,
    url: `${globals.VITE_BACKEND_URL || "http://localhost:5000/api"}${url}`,
    data: body,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
      ...options,
    },
  }).catch((err) => {
    if (true) {
      var message = "";
      if (err?.response) {
        message = err?.response?.data?.message;
      } else if (err?.request) {
        message = "Request Error";
      } else {
        message = "No Defined";
      }
      ErrorAlert(message);
      console.log(err);
    }
    throw err;
  });
};
