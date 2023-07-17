import { FC, useState } from "react";
import { videos } from "../../utils/data";
import VideoPreview from "../../components/videoPreview";
import Button from "../../components/button";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import UploadModal from "../../components/modals/UploadModal";
interface Props {}

const ProfileVideo: FC<Props> = ({}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

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
        {videos.map((video, idx) => (
          <VideoPreview page="profile" key={idx} {...video} />
        ))}
      </div>
      <UploadModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ProfileVideo;
