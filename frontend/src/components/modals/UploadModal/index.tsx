import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Backdrop, Fade } from "@mui/material";
import Button from "../../button";
import Input from "../../input/Input";
import InputFile from "../../input/InputFile";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoPlayer from "../../videoPlayer";
import ChipInput from "../../input/ChipInput";
interface UploadModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const UploadModal: FC<UploadModalProps> = ({ openModal, setOpenModal }) => {
  const [videoForm, setVideoForm] = useState<{
    title: string;
    description: string;
    video: File | null;
    thumbnail: File | null;
    tags: string[];
  }>({
    video: null,
    thumbnail: null,
    title: "",
    tags: [],
    description: "",
  });

  const handleChange = (id: string, value: any) => {
    setVideoForm({ ...videoForm, [id]: value });
  };
  const handleFileChange = (id: string, value: any) => {
    setVideoForm({ ...videoForm, [id]: value });
  };

  const handleChipChange = (data: {
    action: string;
    value?: string;
    idx?: number;
  }) => {
    if (data.action === "add" && data.value?.trim()) {
      setVideoForm({
        ...videoForm,
        tags: [...videoForm.tags, data.value.trim()],
      });
    }
    if (data.action === "remove") {
      const updatedChips: string[] = videoForm.tags.filter(
        (c, i) => i !== data.idx
      );
      setVideoForm({ ...videoForm, tags: updatedChips });
    }
  };

  const handleModalClose = () => {
    setVideoForm({
      video: null,
      thumbnail: null,
      title: "",
      tags: [],
      description: "",
    });
    setOpenModal(false);
  };

  return (
    <Modal
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      open={openModal}
      onClose={handleModalClose}
    >
      <Fade in={openModal}>
        <div className="h-[668px] w-[696px] bg-black-800 border-black-700 border-[1px] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col py-[20px] px-[22px] relative ">
          <div
            onClick={handleModalClose}
            className="text-neutral-400 self-end cursor-pointer"
          >
            <CloseOutlinedIcon />
          </div>
          <div className="pt-[10px] px-[22px] h-full  overflow-y-auto flex flex-col space-y-[23px]">
            {videoForm.video ? (
              <div className="relative">
                <div
                  onClick={() => setVideoForm({ ...videoForm, video: null })}
                  className="absolute top-5 right-5 w-[40px] h-[40px] cursor-pointer rounded-full z-10 hover:scale-105 transition-transform "
                >
                  <DeleteIcon
                    sx={{ width: "100%", height: "100%", padding: "6px" }}
                    className="rounded-full bg-black-900 text-neutral-300 "
                  />
                </div>
                <video src={URL.createObjectURL(videoForm.video)} controls />
              </div>
            ) : (
              <div className="flex items-center justify-center border-[1px] border-black-700 py-[104px]">
                <InputFile
                  accept="video/*"
                  id="video"
                  label="Choose video"
                  handleChange={handleFileChange}
                />
              </div>
            )}
            <div className="flex space-x-[26px]">
              <div className="w-full flex flex-col space-y-[10px]">
                <Input
                  type="text"
                  title="Title"
                  placeholder="Enter title"
                  id="title"
                  handleChange={handleChange}
                  value={videoForm.title}
                />

                <ChipInput
                  id="tags"
                  title="Tags"
                  placeholder="Enter tag and press enter"
                  value={videoForm.tags}
                  handleChange={handleChipChange}
                />

                <Input
                  type="text"
                  title="Description"
                  placeholder="Enter description"
                  id="description"
                  handleChange={handleChange}
                  value={videoForm.description}
                />
              </div>
              <div className="w-full h-full">
                {videoForm.thumbnail ? (
                  <div className="relative">
                    <div
                      onClick={() =>
                        setVideoForm({ ...videoForm, thumbnail: null })
                      }
                      className="absolute top-5 right-5 w-[40px] h-[40px] cursor-pointer rounded-full z-10 hover:scale-105 transition-transform "
                    >
                      <DeleteIcon
                        sx={{ width: "100%", height: "100%", padding: "6px" }}
                        className="rounded-full bg-black-900 text-neutral-300 "
                      />
                    </div>
                    <img
                      className="w-full h-[215px] object-cover "
                      src={URL.createObjectURL(videoForm.thumbnail)}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center border-[1px] border-black-700 h-full">
                    <InputFile
                      accept="image/*"
                      id="thumbnail"
                      label="Choose image"
                      handleChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="sticky top-0 w-full py-[18px] px-[22px] flex items-center space-x-[12px] justify-end border-t-[1px] border-t-black-700">
            <Button type="solid" title="Upload" />
            <Button onClick={handleModalClose} type="outlined" title="Cancel" />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default UploadModal;
