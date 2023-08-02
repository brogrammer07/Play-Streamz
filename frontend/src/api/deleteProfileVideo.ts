import { sendRequest } from "./helper";

type deleteProfileVideoResult = {
  status: string;
  message: string;
  data: {};
};

interface deleteProfileVideoProps {
  videoId: string;
}

export const deleteProfileVideo = async (props: deleteProfileVideoProps) => {
  return sendRequest<deleteProfileVideoResult>(
    "post",
    `/video/delete-profile-video?videoId=${props.videoId}`
  ).then((res) => res.data);
};
