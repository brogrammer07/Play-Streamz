import { useUserAuth } from "../context/userAuthContext";
import { Channel, Video, VideoResponse } from "../typings";
import { sendRequest } from "./helper";

interface getVideosNotFollowingResponse {
  status: string;
  message: string;
  data: VideoResponse[];
}

export const getVideosNotFollowing = () => {
  const { currentUser } = useUserAuth();
  const queryKey = ["videos", currentUser?.uid, "notFollowing"];

  const queryFunction = () =>
    sendRequest<getVideosNotFollowingResponse>(
      "get",
      `/video/get-videos-not-following`,
      false
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
