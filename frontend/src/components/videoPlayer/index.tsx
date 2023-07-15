import { useState, useEffect } from "react";

type VideoPlayerProps = {
  thumbnail: string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ thumbnail }) => {
  return (
    <div className="w-full h-[450px]">
      <img src={thumbnail} className="w-full h-full" alt="" />
    </div>
  );
};

export default VideoPlayer;
