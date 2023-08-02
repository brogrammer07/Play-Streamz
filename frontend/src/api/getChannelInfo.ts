import { useUserAuth } from "../context/userAuthContext";
import { Channel } from "../typings";
import { sendRequest } from "./helper";

interface getChannelInfoResponse {
  status: string;
  message: string;
  data: Channel;
}

export const getChannelInfo = (channelId: string) => {
  const { currentUser } = useUserAuth();
  const queryKey = ["profile", "info", channelId];

  const queryFunction = () =>
    sendRequest<getChannelInfoResponse>(
      "get",
      currentUser?.channelId === channelId
        ? `/channel/get-profile-info`
        : `/channel/get-channel-info?channelId=${channelId}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
