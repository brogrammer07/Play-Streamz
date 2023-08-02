import { FC, Fragment, useEffect } from "react";
import ChannelAction from "../../components/channelProfileCards/ChannelAction";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChannelFollower } from "../../api";
import { CircularProgress, Skeleton } from "@mui/material";
interface ProfileFollowerProps {
  scrolledToBottom: boolean;
}

const ProfileFollower: FC<ProfileFollowerProps> = ({ scrolledToBottom }) => {
  const [getChannelFollowerKey, getChannelFollowerFn] = getChannelFollower();
  const {
    data: channelsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getChannelFollowerKey, getChannelFollowerFn, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.page !== -1 ? lastPage.data.page + 1 : undefined;
    },
  });
  useEffect(() => {
    if (scrolledToBottom && hasNextPage) fetchNextPage();
  }, [scrolledToBottom]);
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-5 gap-[40px]">
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
            {channelsData?.pages.map((page) => (
              <Fragment key={page.data.page}>
                {page.data.channels.map((channel) => (
                  <ChannelAction
                    type="follower"
                    key={channel._id}
                    channel={channel}
                    getChannelFollowerKey={getChannelFollowerKey}
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
    </div>
  );
};

export default ProfileFollower;
