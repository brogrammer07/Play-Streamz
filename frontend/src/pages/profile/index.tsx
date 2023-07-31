import {
  FC,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
  useEffect,
} from "react";
import LayoutPrimary from "../../components/layouts";

import { channel } from "../../utils/data";
import ProfileEdit from "../../components/channelProfileCards/ProfileEdit";
import ProfileVideo from "./ProfileVideo";
import ProfileFollowing from "./ProfileFollowing";
import ProfileFollower from "./ProfileFollower";
import ProfileAbout from "./ProfileAbout";
import { getChannelInfo } from "../../api/getChannelInfo";
import { useQuery } from "@tanstack/react-query";

interface Props {}

interface OptionProps {
  title: string;
  active: 1 | 2 | 3 | 4;
  idx: 1 | 2 | 3 | 4;
  setActive: Dispatch<SetStateAction<1 | 2 | 3 | 4>>;
}

const Option: FC<OptionProps> = ({ title, active, idx, setActive }) => {
  return (
    <div
      onClick={() => setActive(idx)}
      className={`flex items-center justify-center cursor-pointer px-[19px] py-[6px] rounded-md border-b-[1px] ${
        active === idx
          ? "border-b-primary-900"
          : "border-b-neutral-700 hover:border-b-neutral-300"
      }`}
    >
      <p
        className={`p1-sb ${
          active === idx
            ? "text-primary-900"
            : "text-neutral-700 hover:text-neutral-300"
        }`}
      >
        {title}
      </p>
    </div>
  );
};

const Profile: FC<Props> = ({}) => {
  const [getChannelInfoKey, getChannelInfoFn] = getChannelInfo();
  const { data: channelInfo } = useQuery(getChannelInfoKey, getChannelInfoFn);
  const [active, setActive] = useState<1 | 2 | 3 | 4>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerOptionsRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (containerRef.current && headerOptionsRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const boxRect = headerOptionsRef.current.getBoundingClientRect();

      setIsSticky(boxRect.top <= containerRect.top);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  }, [active]);

  useEffect(() => {
    containerRef?.current?.addEventListener("scroll", handleScroll);

    return () => {
      containerRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <LayoutPrimary>
      <div
        ref={containerRef}
        className="flex flex-col space-y-[50px] overflow-y-auto pr-3 relative"
      >
        <ProfileEdit channel={channelInfo?.data} />
        <div className="flex flex-col space-y-[37px]  relative">
          <div
            ref={headerOptionsRef}
            className={`flex w-full justify-center z-20 space-x-[30px] items-center py-[10px] self-center  bg-black-900 ${
              isSticky ? "sticky top-0" : ""
            }`}
          >
            <Option
              active={active}
              setActive={setActive}
              title="Video"
              idx={1}
            />
            <Option
              active={active}
              setActive={setActive}
              title="Following"
              idx={2}
            />
            <Option
              active={active}
              setActive={setActive}
              title="Followers"
              idx={3}
            />
            <Option
              active={active}
              setActive={setActive}
              title="About"
              idx={4}
            />
          </div>
          {active === 1 && <ProfileVideo />}
          {active === 2 && <ProfileFollowing />}
          {active === 3 && <ProfileFollower />}
          {active === 4 && <ProfileAbout />}
        </div>
      </div>
    </LayoutPrimary>
  );
};

export default Profile;
