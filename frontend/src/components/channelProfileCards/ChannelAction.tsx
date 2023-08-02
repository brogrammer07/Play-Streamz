import { FC } from "react";
import { Avatar } from "@mui/material";
import Button from "../button";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { Channel } from "../../typings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followChannel } from "../../api";
import { AxiosError } from "axios";
interface Props {
  type: "following" | "follower";
  channel: Channel & { followerCount: number; isFollowing: boolean };
  getChannelFollowingKey?: string[];
  getChannelFollowerKey?: string[];
}

const ChannelAction: FC<Props> = ({
  channel,
  getChannelFollowingKey,
  getChannelFollowerKey,
  type,
}) => {
  const queryClient = useQueryClient();
  const followMutation = useMutation(followChannel, {
    onSuccess: () => {
      if (type === "follower")
        queryClient.invalidateQueries(getChannelFollowerKey);
      else queryClient.invalidateQueries(getChannelFollowingKey);
    },
    onError: (err: AxiosError) => {
      console.log(err);
    },
  });
  console.log(channel);

  return (
    <div className="flex flex-col  items-center space-y-[19px]">
      <Avatar
        src={channel.channelProfile ? channel.channelProfile : ""}
        sx={{ width: "92px", height: "92px" }}
      />
      <div className="flex flex-col items-center text-neutral-400">
        <p className="p2-sb">{channel.channelName}</p>
        <p className="p3-r">{channel.followerCount} Followers</p>
      </div>

      <Button
        onClick={() => followMutation.mutate(channel._id)}
        title={
          type === "following"
            ? "Unfollow"
            : channel.isFollowing
            ? "Unfollow"
            : "Follow"
        }
        type="solid"
        icon={<FavoriteOutlinedIcon />}
      />
    </div>
  );
};

export default ChannelAction;
