import VideoPreview from "../../components/videoPreview";
import Carousel from "../../components/carousel";
import LayoutPrimary from "../../components/layouts";
import { images } from "../../utils/data";
import CircularProgress from "@mui/material/CircularProgress";
import { getVideos } from "../../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
function Home() {
  const [getVideosKey, getVideosFn] = getVideos();
  const {
    data: videosData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(getVideosKey, getVideosFn, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.page !== -1 ? lastPage.data.page + 1 : undefined;
    },
  });

  return (
    <LayoutPrimary>
      <div
        onScroll={(e) => {
          if (handleInfiniteScroll(e) && hasNextPage) fetchNextPage();
        }}
        className="flex flex-col space-y-[74px] overflow-y-scroll pr-3"
      >
        <Carousel images={images} />
        <div className="grid grid-cols-3 gap-[17px]">
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
                    <VideoPreview page="home" key={video._id} {...video} />
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
    </LayoutPrimary>
  );
}

export default Home;
