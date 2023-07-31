import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LayoutPrimary from "../../components/layouts";
import { Avatar } from "@mui/material";
import Button from "../../components/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followChannel, getSearchVideo } from "../../api";
import { formatDistanceToNowStrict } from "date-fns";
import { useUserAuth } from "../../context/userAuthContext";
import { AxiosError } from "axios";
function Search() {
  const { currentUser } = useUserAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState<string | null>("");
  const [getSearchVideoKey, getSearchVideoFn] = getSearchVideo(searchVal);
  const { data: videos, refetch } = useQuery(
    getSearchVideoKey,
    getSearchVideoFn,
    {
      enabled: searchVal !== null && searchVal !== "" && currentUser !== null,
    }
  );
  const followMutation = useMutation(followChannel, {
    onSuccess: () => {
      queryClient.invalidateQueries(getSearchVideoKey);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });

  useEffect(() => {
    setSearchVal(searchParams.get("search_query"));
  }, [searchParams]);

  useEffect(() => {
    if (searchVal !== null && searchVal !== "") {
      refetch();
    }
  }, [searchVal]);

  return (
    <LayoutPrimary searchVal={searchVal}>
      <div className="flex flex-col space-y-[30px] w-full overflow-y-auto pr-[5px]">
        {videos?.data?.map((video) => (
          <div
            key={video._id}
            className="flex space-x-[22px] w-full cursor-pointer "
          >
            <div
              onClick={() => navigate(`/video?v=${video._id}`)}
              className="flex-[0.35] h-[231px]"
            >
              <img
                className="w-full h-full rounded-lg"
                src={video.thumbnail}
                alt=""
              />
            </div>
            <div className="flex-[0.65] flex flex-col space-y-[16px] text-neutral-400 ">
              <div
                onClick={() => navigate(`/video?v=${video._id}`)}
                className="flex flex-col space-y-[5px]"
              >
                <h3 className="">{video.title}</h3>
                <p className="p2-r">
                  {video.views} views |{" "}
                  {formatDistanceToNowStrict(new Date(video.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex space-x-[17px] items-center">
                <Avatar
                  src={
                    video.channelData.channelProfile
                      ? video.channelData.channelProfile
                      : ""
                  }
                  sx={{ width: "50px", height: "50px" }}
                />
                <p className="p2-sb">{video.channelData.channelName}</p>
                <div
                  onClick={() => followMutation.mutate(video.channelId)}
                  className="z-10"
                >
                  <Button
                    title={
                      video.channelData.isFollowing ? "Unfollow" : "Follow"
                    }
                    type="solid"
                  />
                </div>
              </div>
              <div
                onClick={() => navigate(`/video?v=${video._id}`)}
                className="w-full"
              >
                <p className="p3-r max-w-full">
                  {video.description.slice(0, 120)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LayoutPrimary>
  );
}

export default Search;
