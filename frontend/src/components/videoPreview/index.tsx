import { useNavigate } from "react-router-dom";

type VideoPreviewProps = {
  videoId: string;
  channelId: string;
  title: string;
  thumbnail: string;
  views: number;
  postedAt: string;
  channel: {
    name: string;
  };
};

const VideoPreview: React.FC<VideoPreviewProps> = ({
  title,
  thumbnail,
  views,
  postedAt,
  channel,
  videoId,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/video?v=${videoId}`)}
      className="w-full h-[267px] rounded-2xl relative cursor-pointer"
    >
      <div className="absolute w-full h-full top-0 overlayShadow hover:opacity-0 transition-opacity duration-500 flex flex-col justify-end pb-[26px] px-[34px]">
        <div className="flex flex-col text-neutral-400 space-y-[8px]">
          <h4>{title}</h4>
          <div className="flex items-center justify-between">
            <p className="p3-sb">{channel.name}</p>
            <p className="p3-r">
              {views} Views | {postedAt}
            </p>
          </div>
        </div>
      </div>
      <img className="w-full h-full rounded-2xl" src={thumbnail} alt="" />
    </div>
  );
};

export default VideoPreview;
