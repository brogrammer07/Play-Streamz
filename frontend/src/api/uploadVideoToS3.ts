import axios from "axios";
import { sendRequest } from "./helper";

type uploadVideoToS3Result = {
  status: string;
  message: string;
  data: {
    url: string;
  };
};

export const uploadVideoToS3 = async (
  uploadUrl: string,
  video: File | null
) => {
  return await axios
    .put(uploadUrl, video, {
      headers: { "Content-Type": "video/*" },
    })
    .catch((err) => {
      console.log("AWS S3 upload error", err);
    });
};
