import { Channel } from "../typings";
import { sendRequest } from "./helper";

interface getChannelFollowingResponse {
  status: string;
  message: string;
  data: { page: number; channels: [Channel & { followerCount: number }] };
}

export const getChannelFollowing = () => {
  const queryKey = ["channel", "following"];

  const queryFunction = ({ pageParam }: { pageParam?: number }) =>
    sendRequest<getChannelFollowingResponse>(
      "get",
      `/channel/get-channel-following?page=${pageParam}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
