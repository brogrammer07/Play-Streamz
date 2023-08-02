import { useUserAuth } from "../context/userAuthContext";
import { Channel, Video, VideoResponse, VideoSearchResponse } from "../typings";
import { sendRequest } from "./helper";

interface getSearchVideoResponse {
  status: string;
  message: string;
  data: VideoSearchResponse[];
}

export const getSearchVideo = (searchQuery: string | null) => {
  const { currentUser } = useUserAuth();
  const queryKey: (string | undefined)[] = [];
  if (currentUser)
    queryKey.push("videos", currentUser?._id, searchQuery as string);
  else queryKey.push("videos", searchQuery as string);

  const queryFunction = () =>
    sendRequest<getSearchVideoResponse>(
      "get",
      currentUser
        ? `/video/get-search-video?searchQuery=${searchQuery}`
        : `/video/get-all-search-video?searchQuery=${searchQuery}`
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
