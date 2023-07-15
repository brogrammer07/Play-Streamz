import { useState } from "react";
import LayoutPrimary from "../../components/layouts";
import VideoPreview from "../../components/videoPreview";
import { video, videos } from "../../utils/data";
import VideoPlayer from "../../components/videoPlayer";
import { Avatar } from "@mui/material";
import Button from "../../components/button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import DescriptionBox from "./DescriptionBox";
import CommentSection from "./CommentSection";
function Video() {
  const [currVideo, setCurrVideo] = useState(video);
  return (
    <LayoutPrimary type="secondary">
      <div className="flex space-x-[35px] overflow-y-auto pr-3">
        <div className="flex-[0.7] flex flex-col space-y-[20px]">
          <VideoPlayer thumbnail={currVideo.thumbnail} />
          <h3 className="text-neutral-400">{currVideo.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-[35px]">
              <div className="flex items-center space-x-[20px]">
                <Avatar
                  src={currVideo.channel.profile}
                  sx={{ width: "52px", height: "52px" }}
                />
                <div className="flex flex-col space-y-[1px] text-neutral-400">
                  <h4>{currVideo.channel.name}</h4>
                  <p className="p3-r">
                    {currVideo.channel.followers} Followers
                  </p>
                </div>
              </div>
              <Button
                title={currVideo.channel.following ? "Unfollow" : "Follow"}
                type="solid"
                icon={
                  !currVideo.channel.following ? (
                    <FavoriteBorderOutlinedIcon />
                  ) : (
                    <FavoriteOutlinedIcon />
                  )
                }
              />
            </div>
            <div className="flex items-center">
              <Button
                icon={
                  currVideo.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />
                }
                title={currVideo.likes}
                type="normal"
              />
              <Button
                icon={
                  currVideo.disliked ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOutlinedIcon />
                  )
                }
                title={currVideo.dislikes}
                type="normal"
              />
              <Button icon={<ShareIcon />} title={"Share"} type="normal" />
            </div>
          </div>
          <DescriptionBox
            description={currVideo.description}
            postedAt={currVideo.postedAt}
            tags={currVideo.tags}
            views={currVideo.views}
          />
          <CommentSection comments={currVideo.comments} />
        </div>
        <div className="flex-[0.3] flex flex-col space-y-[25px]">
          {videos.map((video, idx) => (
            <VideoPreview key={idx} {...video} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Video;
