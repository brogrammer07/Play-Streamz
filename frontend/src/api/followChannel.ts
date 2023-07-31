import { sendRequest } from "./helper";
type followChannelResponse = {
  status: string;
  message: string;
  data: {};
};
export const followChannel = async (channelId: string) => {
  return sendRequest<followChannelResponse>(
    "patch",
    `/channel/follow?channelId=${channelId}`
  ).then((res) => res.data);
};
