import { FC, useState } from "react";
import { Avatar } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { Channel } from "../../typings";
interface Props {
  channel?: Channel;
}

const ProfileEdit: FC<Props> = ({ channel }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  return (
    <div className="flex flex-col  items-center space-y-[14px]">
      {channel ? (
        <>
          <Avatar
            src={channel.channelProfile ? channel.channelProfile : ""}
            sx={{ width: "100px", height: "100px" }}
          />
          <div className="flex flex-col  text-neutral-400 space-y-[3px] w-full">
            <div className="flex items-center space-x-2 justify-center">
              {edit ? (
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-none border-[1px] border-black-700 rounded-md outline-none px-3 py-1 w-[150px] ml-11 placeholder:p3-r"
                  placeholder="Enter new name"
                />
              ) : (
                <p className="p2-sb ">{channel.channelName}</p>
              )}
              {edit ? (
                <div className="flex items-center space-x-1">
                  <div
                    onClick={() => setEdit(false)}
                    className="cursor-pointer w-[16px] h-[16px] flex items-center text-primary-900"
                  >
                    <CheckOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                  </div>
                  <div
                    onClick={() => {
                      setEdit(false);
                      setNewName("");
                    }}
                    className="cursor-pointer w-[16px] h-[16px] flex items-center"
                  >
                    <ClearOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => setEdit(true)}
                  className="cursor-pointer w-[16px] h-[16px] flex items-center"
                >
                  <EditOutlinedIcon sx={{ width: "100%", height: "100%" }} />
                </div>
              )}
            </div>
            <p className="p3-r self-center">
              {channel.followerCount} Followers {channel.videoCount} Videos
            </p>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProfileEdit;
