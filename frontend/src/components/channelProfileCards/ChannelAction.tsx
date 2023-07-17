import { FC } from "react";
import { Avatar } from "@mui/material";
import Button from "../button";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
interface Props {
  channel: {
    name: string;
    following: boolean;
    followers: number;
    profile: string;
  };
}

const ChannelAction: FC<Props> = ({ channel }) => {
  return (
    <div className="flex flex-col  items-center space-y-[19px]">
      <Avatar src={channel.profile} sx={{ width: "92px", height: "92px" }} />
      <div className="flex flex-col items-center text-neutral-400">
        <p className="p2-sb">{channel.name}</p>
        <p className="p3-r">{channel.followers} Followers</p>
      </div>
      <Button title={"Unfollow"} type="solid" icon={<FavoriteOutlinedIcon />} />
    </div>
  );
};

export default ChannelAction;
