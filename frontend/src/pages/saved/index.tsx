import { useState } from "react";
import LayoutPrimary from "../../components/layouts";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { videos } from "../../utils/data";
import VideoPreview from "../../components/videoPreview";
type Props = {};

function Saved({}: Props) {
  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[32px] overflow-y-auto pr-3">
        <div className="text-neutral-400 flex items-center space-x-2">
          <VideoLibraryOutlinedIcon />
          <h2>Saved</h2>
        </div>
        <div className="grid grid-cols-3 gap-[17px]">
          {videos.map((video, idx) => (
            <VideoPreview page="saved" key={idx} {...video} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Saved;
