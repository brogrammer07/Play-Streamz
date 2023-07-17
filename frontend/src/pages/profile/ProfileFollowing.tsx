import { FC } from "react";
import { channels } from "../../utils/data";
import ChannelAction from "../../components/channelProfileCards/ChannelAction";

interface ProfileFollowingProps {}

const ProfileFollowing: FC<ProfileFollowingProps> = ({}) => {
  return (
    <div className="grid grid-cols-5 gap-[40px]">
      {channels.map((channel, idx) => (
        <ChannelAction key={idx} channel={channel} />
      ))}
    </div>
  );
};

export default ProfileFollowing;
