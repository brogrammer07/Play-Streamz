import { Channel } from "../typings";
import { sendRequest } from "./helper";

interface getChannelFollowerResponse {
  status: string;
  message: string;
  data: {
    page: number;
    channels: [Channel & { followerCount: number; isFollowing: boolean }];
  };
}

export const getChannelFollower = () => {
  const queryKey = ["channel", "follower"];

  const queryFunction = ({ pageParam }: { pageParam?: number }) =>
    sendRequest<getChannelFollowerResponse>(
      "get",
      `/channel/get-channel-follower?page=${pageParam}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
