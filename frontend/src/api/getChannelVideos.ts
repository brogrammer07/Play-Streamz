import { VideoResponse } from "../typings";
import { sendRequest } from "./helper";

interface getChannelVideosResponse {
  status: string;
  message: string;
  data: VideoResponse[];
}

export const getChannelVideos = (channelId?: string) => {
  const queryKey = ["channel", "info", channelId ? channelId : "me"];

  const queryFunction = () =>
    sendRequest<getChannelVideosResponse>(
      "get",
      channelId
        ? `/video/get-channel-video?channelId${channelId}`
        : `/video/get-channel-video`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
