import { sendRequest } from "./helper";

type getPresignedUrlResult = {
  status: string;
  message: string;
  data: {
    videoUrl: string;
    imageUrl: string;
  };
};

interface getPresignedUrlProps {
  videoFileName: string;
  videoFileType: string;
  imageFileType: string;
  imageFileName: string;
}

export const getPresignedUrl = async (props: getPresignedUrlProps) => {
  return sendRequest<getPresignedUrlResult>(
    "get",
    `/video/get-presigned-url?videoFileName=${props.videoFileName}&imageFileName=${props.imageFileName}&imageFileType=${props.imageFileType}&videoFileType=${props.videoFileType}`
  ).then((res) => res.data);
};
