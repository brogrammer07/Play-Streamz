import { useUserAuth } from "../context/userAuthContext";
import { Channel, Video, VideoResponse, VideoSearchResponse } from "../typings";
import { sendRequest } from "./helper";

interface getSearchVideoResponse {
  status: string;
  message: string;
  data: VideoSearchResponse[];
}

export const getSearchVideo = (searchQuery: string | null) => {
  const queryKey = ["videos", searchQuery];

  const queryFunction = () =>
    sendRequest<getSearchVideoResponse>(
      "get",
      `/video/get-search-video?searchQuery=${searchQuery}`,
      false
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
