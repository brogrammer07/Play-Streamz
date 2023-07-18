import { FC, useState } from "react";
import LayoutPrimary from "../../components/layouts";

import DeleteIcon from "@mui/icons-material/Delete";
import Input from "../../components/input/Input";
import ChipInput from "../../components/input/ChipInput";
import InputFile from "../../components/input/InputFile";
import Button from "../../components/button";
import StreamPreview from "./StreamPreview";
interface LiveProps {}

const Live: FC<LiveProps> = ({}) => {
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

  return (
    <LayoutPrimary>
      <div className="flex flex-col space-y-[18px] overflow-y-auto h-full pr-3">
        <StreamPreview />
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

        <Button title="Go Live" type="solid" />
      </div>
    </LayoutPrimary>
  );
};

export default Live;
