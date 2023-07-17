import { FC } from "react";
import { channels } from "../../utils/data";
import ChannelAction from "../../components/channelProfileCards/ChannelAction";

interface ProfileFollowerProps {}

const ProfileFollower: FC<ProfileFollowerProps> = ({}) => {
  return (
    <div className="grid grid-cols-5 gap-[40px]">
      {channels.map((channel, idx) => (
        <ChannelAction key={idx} channel={channel} />
      ))}
    </div>
  );
};

export default ProfileFollower;
