import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LayoutPrimary from "../../components/layouts";
import { Avatar, Skeleton } from "@mui/material";
import Button from "../../components/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followChannel, getSearchVideo } from "../../api";
import { formatDistanceToNowStrict } from "date-fns";
import { useUserAuth } from "../../context/userAuthContext";
import { AxiosError } from "axios";
import SignInModal from "../../components/modals/SignInModal";
import { toast } from "react-toastify";

function Search() {
  const { currentUser } = useUserAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchVal, setSearchVal] = useState<string | null>("");
  const [getSearchVideoKey, getSearchVideoFn] = getSearchVideo(searchVal);
  const {
    data: videos,
    isLoading,
    refetch,
  } = useQuery(getSearchVideoKey, getSearchVideoFn, {
    enabled: searchVal !== null && searchVal !== "",
  });
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
    <>
      <LayoutPrimary searchVal={searchVal}>
        <div className="flex flex-col space-y-[30px] w-full overflow-y-auto pr-[5px]">
          {isLoading ? (
            <>
              <div className="flex space-x-[22px]">
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  sx={{ bgcolor: "#252522", borderRadius: "30px", flex: 0.35 }}
                  height={"231px"}
                  width={"100%"}
                />
                <div className="flex-[0.65] flex flex-col max-w-[50%]">
                  <Skeleton
                    variant="text"
                    width="70%"
                    sx={{ fontSize: "1rem", bgcolor: "#252522" }}
                  />
                  <Skeleton
                    variant="text"
                    width="30%"
                    sx={{ fontSize: "1rem", bgcolor: "#252522" }}
                  />
                  <div className="flex space-x-[17px]">
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      sx={{ bgcolor: "#252522" }}
                    />
                    <Skeleton
                      variant="text"
                      width="30%"
                      sx={{ fontSize: "1rem", bgcolor: "#252522" }}
                    />
                  </div>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", bgcolor: "#252522" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
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
                      <div
                        onClick={() =>
                          navigate(`/profile?c=${video.channelId}`)
                        }
                        className=""
                      >
                        <Avatar
                          src={
                            video.channelData.channelProfile
                              ? video.channelData.channelProfile
                              : ""
                          }
                          sx={{ width: "50px", height: "50px" }}
                        />
                      </div>
                      <p
                        onClick={() =>
                          navigate(`/profile?c=${video.channelId}`)
                        }
                        className="p2-sb"
                      >
                        {video.channelData.channelName}
                      </p>
                      {currentUser?.channelId !== video.channelId && (
                        <div
                          onClick={() => {
                            if (currentUser) {
                              followMutation.mutate(video.channelId);
                            } else setOpenModal(true);
                          }}
                          className="z-10"
                        >
                          <Button
                            title={
                              video.channelData.isFollowing
                                ? "Unfollow"
                                : "Follow"
                            }
                            type="solid"
                          />
                        </div>
                      )}
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
              ))}{" "}
            </>
          )}
        </div>
      </LayoutPrimary>
      <SignInModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Search;
