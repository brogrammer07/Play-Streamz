import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Backdrop, Fade } from "@mui/material";
import Button from "../../button";
import Input from "../../input/Input";
import InputFile from "../../input/InputFile";
import DeleteIcon from "@mui/icons-material/Delete";
import ChipInput from "../../input/ChipInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getPresignedUrl, uploadVideo, uploadVideoToS3 } from "../../../api";
import { toast } from "react-toastify";

interface UploadModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  getChannelVideosKey: string[];
}

const UploadModal: FC<UploadModalProps> = ({
  openModal,
  setOpenModal,
  getChannelVideosKey,
}) => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
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
    setVideoForm((prevVideoForm) => ({ ...prevVideoForm, [id]: value }));
  };
  const handleFileChange = (id: string, value: any) => {
    setVideoForm((prevVideoForm) => ({ ...prevVideoForm, [id]: value }));
  };

  const handleChipChange = (data: {
    action: string;
    value?: string;
    idx?: number;
  }) => {
    if (data.action === "add" && data.value && data.value?.trim()) {
      const prevTags = [...videoForm.tags];
      prevTags.push(data.value.trim());
      setVideoForm((prevVideoForm) => ({
        ...prevVideoForm,
        tags: prevTags,
      }));
    }
    if (data.action === "remove") {
      const updatedChips: string[] = videoForm.tags.filter(
        (c, i) => i !== data.idx
      );
      setVideoForm((prevVideoForm) => ({
        ...prevVideoForm,
        tags: updatedChips,
      }));
    }
  };

  const handleModalClose = () => {
    if (!loading) {
      setVideoForm({
        video: null,
        thumbnail: null,
        title: "",
        tags: [],
        description: "",
      });
      setOpenModal(false);
    }
  };

  const uploadVideoMutation = useMutation(uploadVideo, {
    onSuccess: (response) => {
      setLoading(false);
      toast.success("Video Uploaded Successfully!");
      setVideoForm({
        video: null,
        thumbnail: null,
        title: "",
        tags: [],
        description: "",
      });
      queryClient.invalidateQueries(getChannelVideosKey);
      setOpenModal(false);
    },
    onError: (err: AxiosError) => {
      setLoading(false);
      toast.error("An error occurred while uploading, please try again");
      console.log("eee", err);
    },
  });

  const handleUpload = async () => {
    if (videoForm.video && videoForm.thumbnail) {
      setLoading(true);
      const videoFileName = videoForm.video.name.split(".")[0];
      const videoFileType = videoForm.video.type;
      const imageFileName = videoForm.thumbnail.name.split(".")[0];
      const imageFileType = videoForm.thumbnail.type;
      await getPresignedUrl({
        videoFileName,
        videoFileType,
        imageFileType,
        imageFileName,
      }).then((res) => {
        const videolink = res.data.videoUrl;
        const imagelink = res.data.imageUrl;
        var checkVideoUpload = true;
        var checkImageUpload = true;
        uploadVideoToS3(videolink, videoForm.video).then(() => {
          checkVideoUpload = true;
        });
        uploadVideoToS3(imagelink, videoForm.thumbnail).then(() => {
          checkImageUpload = true;
        });
        if (checkImageUpload && checkVideoUpload) {
          uploadVideoMutation.mutate({
            title: videoForm.title,
            description: videoForm.description,
            tags: videoForm.tags,
            thumbnail: imagelink.split("?")[0],
            link: videolink.split("?")[0],
          });
        }
      });
    }
  };

  const checkDisabled = () => {
    if (
      videoForm.description === "" ||
      videoForm.title === "" ||
      videoForm.tags.length === 0 ||
      videoForm.thumbnail === null ||
      videoForm.video === null
    )
      return true;
    else return false;
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
            <Button
              disabled={checkDisabled()}
              loading={loading}
              onClick={handleUpload}
              type="solid"
              title={loading ? "Uploading" : "Upload"}
            />
            <Button onClick={handleModalClose} type="outlined" title="Cancel" />
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default UploadModal;
