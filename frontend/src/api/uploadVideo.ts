import { sendRequest } from "./helper";

type uploadVideoResult = {
  status: string;
  message: string;
  data: {};
};

interface uploadVideoProps {
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  tags: string[];
}

export const uploadVideo = async (props: uploadVideoProps) => {
  return sendRequest<uploadVideoResult>("post", `/video/upload`, {
    ...props,
  }).then((res) => res.data);
};
