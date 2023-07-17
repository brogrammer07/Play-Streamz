import VideoPreview from "../../components/videoPreview";
import Carousel from "../../components/carousel";
import LayoutPrimary from "../../components/layouts";
import { videos, images } from "../../utils/data";
function Home() {
  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[74px] overflow-y-auto pr-3">
        <Carousel images={images} />
        <div className="grid grid-cols-3 gap-[17px]">
          {videos.map((video, idx) => (
            <VideoPreview page="home" key={idx} {...video} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Home;
