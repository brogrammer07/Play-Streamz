import Video from "../../components/Video";
import Carousel from "../../components/carousel";
import LayoutPrimary from "../../components/layouts";
const images = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1563874257547-d19fbb71b46c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Night Life",
    videoId: "",
    channelId: "",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1192&q=80",
    title: "Japan",
    videoId: "",
    channelId: "",
  },
  {
    thumbnail:
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    title: "Japan Night",
    videoId: "",
    channelId: "",
  },
];
const videos = [
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1542681575-352258e0c854?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1514064019862-23e2a332a6a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1914&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1561266322-ccd177d44cff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1333&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1436262513933-a0b06755c784?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
  {
    videoId: "",
    channelId: "",
    title: "Lorem ipsum dolor sit amet consectetur.",
    thumbnail:
      "https://images.unsplash.com/photo-1550199453-ebdcdb13216b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    views: 50,
    postedAt: "12 days ago",
    channel: {
      name: "Lorem",
    },
  },
];
function Home() {
  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[74px] overflow-y-auto pr-3">
        <Carousel images={images} />
        <div className="grid grid-cols-3 gap-[17px]">
          {videos.map((video, idx) => (
            <Video key={idx} {...video} />
          ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Home;
