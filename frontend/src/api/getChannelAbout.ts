import { useUserAuth } from "../context/userAuthContext";
import { Channel } from "../typings";
import { sendRequest } from "./helper";

interface getChannelAboutResponse {
  status: string;
  message: string;
  data: Channel & {
    videoCount: number;
    followerCount: number;
    followingCount: number;
  };
}

export const getChannelAbout = (channelId: string) => {
  const { currentUser } = useUserAuth();
  const queryKey = ["profile", "about", channelId];

  const queryFunction = () =>
    sendRequest<getChannelAboutResponse>(
      "get",
      currentUser?.channelId === channelId
        ? `/channel/get-profile-about?`
        : `/channel/get-channel-about?channelId${channelId}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
