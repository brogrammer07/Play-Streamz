import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChannelAbout } from "../../api";
import { useUserAuth } from "../../context/userAuthContext";
import { Skeleton } from "@mui/material";
import { format } from "date-fns";

interface AboutCardProps {
  title: string;
  value: string | number;
}

const AboutCard: FC<AboutCardProps> = ({ title, value }) => {
  return (
    <div className="w-full h-[267px] rounded-2xl relative bg-black-800 flex flex-col space-y-[10px] items-center justify-center text-neutral-300">
      <p className="p1-r">{title}</p>
      <h3 className="text-primary-900">
        {title === "Joining Date" && value !== ""
          ? format(new Date(value), "do MMMM yyyy")
          : value}
      </h3>
    </div>
  );
};

const ProfileAbout = ({}) => {
  const { currentUser } = useUserAuth();
  const [channelId, setChannelId] = useState<string | null>(null);
  const [getChannelAboutKey, getChannelAboutFn] = getChannelAbout(
    channelId as string
  );
  const { data: channel, isLoading } = useQuery(
    getChannelAboutKey,
    getChannelAboutFn,
    {
      enabled: channelId !== null,
    }
  );
  useEffect(() => {
    if (currentUser) setChannelId(currentUser.channelId);
  }, []);
  console.log(channel);

  return (
    <div className="grid grid-cols-3 gap-[17px]">
      {isLoading || !channel?.data ? (
        <>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{ bgcolor: "#252522", borderRadius: "30px" }}
            height={"267px"}
            width={"100%"}
          />
        </>
      ) : (
        <>
          {<AboutCard title="Videos" value={channel.data.videoCount} />}
          {<AboutCard title="Followers" value={channel.data.followerCount} />}
          {<AboutCard title="Followings" value={channel.data.followingCount} />}
          {<AboutCard title="Views" value={channel.data.views} />}
          {<AboutCard title="Likes" value={channel.data.likes} />}
          {<AboutCard title="Joining Date" value={channel.data.createdAt} />}
        </>
      )}
    </div>
  );
};

export default ProfileAbout;
