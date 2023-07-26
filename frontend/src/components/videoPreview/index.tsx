import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { VideoResponse } from "../../typings";
import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
type VideoPreviewProps = VideoResponse & {
  page: "home" | "saved" | "liked" | "profile";
};
const VideoPreview: React.FC<VideoPreviewProps> = ({
  title,
  thumbnail,
  views,
  createdAt,
  channelData,
  _id,
  page,
}) => {
  const navigate = useNavigate();
  const [showDeleteIcon, setShowDeleteIcon] = useState<boolean>(false);
  return (
    <div
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
      className="w-full h-[267px] relative"
    >
      {page !== "home" && showDeleteIcon && (
        <div className="text-neutral-300 z-10 absolute top-4 flex justify-end right-4 cursor-pointer rounded-2xl">
          <CloseOutlinedIcon />
        </div>
      )}
      <div
        onClick={() => navigate(`/video?v=${_id}`)}
        className="w-full h-full rounded-2xl relative cursor-pointer"
      >
        <div className="absolute w-full h-full top-0 overlayShadow hover:opacity-0 transition-opacity duration-500 flex flex-col justify-end pb-[26px] px-[34px]">
          <div className="flex flex-col text-neutral-400 space-y-[8px]">
            <h4>{title}</h4>
            <div className="flex items-center justify-between">
              <p className="p3-sb">{channelData.channelName}</p>
              <p className="p3-r">
                {views} Views |{" "}
                {formatDistanceToNowStrict(new Date(createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
        <img className="w-full h-full rounded-2xl" src={thumbnail} alt="" />
      </div>
    </div>
  );
};

export default VideoPreview;
