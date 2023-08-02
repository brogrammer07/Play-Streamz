import { useUserAuth } from "../context/userAuthContext";
import { VideoResponse } from "../typings";
import { sendRequest } from "./helper";

interface getChannelVideosResponse {
  status: string;
  message: string;
  data: { page: number; videos: VideoResponse[] };
}

export const getChannelVideos = (channelId: string) => {
  const { currentUser } = useUserAuth();
  const queryKey = ["profile", "video", channelId];

  const queryFunction = ({ pageParam }: { pageParam?: number }) =>
    sendRequest<getChannelVideosResponse>(
      "get",
      currentUser?.channelId === channelId
        ? `/channel/get-profile-video?page=${pageParam}`
        : `/channel/get-channel-video?page=${pageParam}&channelId${channelId}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
