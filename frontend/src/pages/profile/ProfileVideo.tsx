import { FC, useState, useEffect, Fragment } from "react";
import VideoPreview from "../../components/videoPreview";
import Button from "../../components/button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import UploadModal from "../../components/modals/UploadModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelVideos } from "../../api";
import { useUserAuth } from "../../context/userAuthContext";
import { CircularProgress, Skeleton } from "@mui/material";
interface ProfileVideoProps {
  scrolledToBottom: boolean;
}

const ProfileVideo: FC<ProfileVideoProps> = ({ scrolledToBottom }) => {
  const { currentUser } = useUserAuth();

  const [channelId, setChannelId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [getChannelVideosKey, getChannelVideosFn] = getChannelVideos(
    channelId as string
  );
  const {
    data: videosData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getChannelVideosKey, getChannelVideosFn, {
    enabled: channelId !== null,
    getNextPageParam: (lastPage) => {
      return lastPage.data.page !== -1 ? lastPage.data.page + 1 : undefined;
    },
  });
  useEffect(() => {
    if (currentUser) {
      setChannelId(currentUser.channelId);
    }
  }, []);

  useEffect(() => {
    if (scrolledToBottom && hasNextPage) fetchNextPage();
  }, [scrolledToBottom]);

  return (
    <>
      <div className="grid grid-cols-3 gap-[17px]">
        <div className="w-full h-[267px] rounded-2xl relative bg-black-800 flex flex-col space-y-[10px] items-center justify-center">
          <p className="p1-sb text-neutral-300">Upload a new video</p>
          <Button
            onClick={() => setOpenModal(true)}
            type="solid"
            title={"Upload"}
            icon={<CloudUploadOutlinedIcon />}
          />
        </div>
        {isLoading ? (
          <>
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "#252522", borderRadius: "30px" }}
              height={"267px"}
              width={"100%"}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "#252522", borderRadius: "30px" }}
              height={"267px"}
              width={"100%"}
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "#252522", borderRadius: "30px" }}
              height={"267px"}
              width={"100%"}
            />
          </>
        ) : (
          <>
            {videosData?.pages.map((page) => (
              <Fragment key={page.data.page}>
                {page.data.videos.map((video) => (
                  <VideoPreview
                    page="profile"
                    key={video._id}
                    {...video}
                    getChannelVideosKey={getChannelVideosKey}
                  />
                ))}
              </Fragment>
            ))}
          </>
        )}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <UploadModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        getChannelVideosKey={getChannelVideosKey}
      />
    </>
  );
};

export default ProfileVideo;
