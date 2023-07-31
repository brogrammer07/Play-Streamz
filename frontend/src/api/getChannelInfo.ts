import { Channel } from "../typings";
import { sendRequest } from "./helper";

interface getChannelInfoResponse {
  status: string;
  message: string;
  data: Channel;
}

export const getChannelInfo = (channelId?: string) => {
  const queryKey = ["channel", "info", channelId ? channelId : "me"];

  const queryFunction = () =>
    sendRequest<getChannelInfoResponse>(
      "get",
      channelId
        ? `/channel/get-info?channelId${channelId}`
        : `/channel/get-info`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
