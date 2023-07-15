import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LayoutPrimary from "../../components/layouts";
import { Avatar } from "@mui/material";
import Button from "../../components/button";
import { videos } from "../../utils/data";
function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState<string | null>("");
  useEffect(() => {
    setSearchVal(searchParams.get("search_query"));
  }, [searchParams]);

  return (
    <LayoutPrimary searchVal={searchVal}>
      <div className="flex flex-col space-y-[30px] w-full overflow-y-auto pr-[5px]">
        {videos.map((video, idx) => (
          <div
            onClick={() => navigate(`/video?v=${video.videoId}`)}
            key={idx}
            className="flex space-x-[22px] w-full cursor-pointer"
          >
            <div className="w-[40%] h-[231px]">
              <img
                className="w-full h-full rounded-lg"
                src={video.thumbnail}
                alt=""
              />
            </div>
            <div className="flex flex-col space-y-[16px] text-neutral-400">
              <div className="flex flex-col space-y-[5px]">
                <h3 className="">{video.title}</h3>
                <p className="p2-r">
                  {video.views} views | {video.postedAt}
                </p>
              </div>
              <div className="flex space-x-[17px] items-center">
                <Avatar
                  src={video.channel.profile}
                  sx={{ width: "50px", height: "50px" }}
                />
                <p className="p2-sb">{video.channel.name}</p>
                <div className="z-10">
                  <Button
                    title={video.channel.following ? "Unfollow" : "Follow"}
                    type="solid"
                  />
                </div>
              </div>
              <p className="p3-r">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </LayoutPrimary>
  );
}

export default Search;
