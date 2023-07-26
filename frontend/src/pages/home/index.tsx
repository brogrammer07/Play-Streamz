import VideoPreview from "../../components/videoPreview";
import Carousel from "../../components/carousel";
import LayoutPrimary from "../../components/layouts";
import { videos, images } from "../../utils/data";
import { getVideosNotFollowing } from "../../api";
import { useQuery } from "@tanstack/react-query";
function Home() {
  const [getVideosNotFollowingKey, getVideosNotFollowingFn] =
    getVideosNotFollowing();
  const { data: videos } = useQuery(
    getVideosNotFollowingKey,
    getVideosNotFollowingFn
  );

  console.log(videos);

  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[74px] overflow-y-auto pr-3">
        <Carousel images={images} />
        <div className="grid grid-cols-3 gap-[17px]">
          {videos?.data?.map((video) => (
            <VideoPreview page="home" key={video._id} {...video} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Home;
