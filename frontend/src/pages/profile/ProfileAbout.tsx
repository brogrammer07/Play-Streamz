import { FC } from "react";
import { channel } from "../../utils/data";

interface AboutCardProps {
  title: string;
  value: string | number;
}

const AboutCard: FC<AboutCardProps> = ({ title, value }) => {
  return (
    <div className="w-full h-[267px] rounded-2xl relative bg-black-800 flex flex-col space-y-[10px] items-center justify-center text-neutral-300">
      <p className="p1-r">{title}</p>
      <h3 className="text-primary-900">{value}</h3>
    </div>
  );
};

const ProfileAbout = ({}) => {
  return (
    <div className="grid grid-cols-3 gap-[17px]">
      {<AboutCard title="Videos" value={channel.videos} />}
      {<AboutCard title="Followers" value={channel.followers} />}
      {<AboutCard title="Followings" value={channel.followings} />}
      {<AboutCard title="Views" value={channel.views} />}
      {<AboutCard title="Likes" value={channel.likes} />}
      {<AboutCard title="Joining Date" value={channel.joiningDate} />}
    </div>
  );
};

export default ProfileAbout;
