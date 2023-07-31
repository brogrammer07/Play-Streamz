import { useUserAuth } from "../context/userAuthContext";
import { Channel, Video, VideoResponse } from "../typings";
import { sendRequest } from "./helper";

interface getVideosResponse {
  status: string;
  message: string;
  data: { page: number; videos: VideoResponse[] };
}

export const getVideos = () => {
  const { currentUser } = useUserAuth();
  const queryKey: (string | undefined)[] = [];
  if (currentUser) queryKey.push("videos", currentUser?._id);
  else queryKey.push("videos");

  const queryFunction = ({ pageParam }: { pageParam?: number }) =>
    sendRequest<getVideosResponse>(
      "get",
      currentUser
        ? `/video/get-videos${pageParam ? `?page=${pageParam}` : ""}`
        : `/video/get-all-videos${pageParam ? `?page=${pageParam}` : ""}`,
      false
    ).then((res) => res.data);

  return [queryKey, queryFunction] as const;
};
