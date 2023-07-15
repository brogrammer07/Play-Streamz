import { Dispatch, SetStateAction, useState } from "react";
import { NavLink } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import Drawer from "@mui/material/Drawer";
import { Avatar } from "@mui/material";
type OptionsProps = {
  title: string;
  link: string;
  icon: React.ReactNode;
};
const isActiveStyle =
  "bg-neutral-400 text-neutral-900 flex items-center space-x-[20px] py-[12px] px-[19px] rounded-xl";
const isNotActiveStyle =
  "text-neutral-700 flex items-center space-x-[20px] py-[12px] px-[19px] rounded-xl hover:text-neutral-300 transition-colors";
const Options: React.FC<OptionsProps> = ({ title, link, icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }
    >
      <div>{icon}</div>
      <p className="p1-sb">{title}</p>
    </NavLink>
  );
};

type SidebarProps = {
  type?: "primary" | "secondary";
};

const SidebarContent = ({
  type = "primary",
  setOpenSidebar,
}: {
  type?: "primary" | "secondary";
  setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={
        "bg-gradient-to-r from-[#000000] to-black-900 h-full w-full flex flex-col py-[30px] pl-[30px] space-y-[25px]"
      }
    >
      <div className="flex ">
        {type === "secondary" && (
          <div
            onClick={() => setOpenSidebar(false)}
            className="text-neutral-400 cursor-pointer"
          >
            <MenuOutlinedIcon />
          </div>
        )}
        <div className="w-full flex justify-center">
          <img
            src="/assets/Logo_with_name.png"
            className="w-[114px] h-[93px]"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col space-y-[6px] h-full overflow-y-auto pr-2">
        <div className="flex flex-col pb-[5px] border-b-black-700 border-b-[1px]">
          <Options
            title="Home"
            link="/"
            icon={<HomeOutlinedIcon sx={{ height: "24px", width: "24px" }} />}
          />
          <Options
            title="Profile"
            link="/profile"
            icon={<PersonOutlinedIcon sx={{ height: "24px", width: "24px" }} />}
          />
          <Options
            title="Live"
            link="/live"
            icon={
              <SensorsOutlinedIcon sx={{ height: "24px", width: "24px" }} />
            }
          />
          <Options
            title="Saved"
            link="/saved"
            icon={
              <VideoLibraryOutlinedIcon
                sx={{ height: "24px", width: "24px" }}
              />
            }
          />
          <Options
            title="Liked"
            link="/liked"
            icon={
              <ThumbUpOutlinedIcon sx={{ height: "24px", width: "24px" }} />
            }
          />
          <Options
            title="Following"
            link="/following"
            icon={
              <SubscriptionsOutlinedIcon
                sx={{ height: "24px", width: "24px" }}
              />
            }
          />
        </div>
        <div className="flex flex-col pb-[5px] border-b-black-700 border-b-[1px] h-full ">
          <div className="px-[20px] py-[12px]">
            <h4 className="text-neutral-700">Followings</h4>
          </div>
          <div className="flex flex-col  h-full">
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
            <Options
              title="Lorem"
              link="/channel"
              icon={
                <Avatar
                  src="/assets/sample_profile_1.png"
                  sx={{ height: "24px", width: "24px" }}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function Sidebar({ type = "primary" }: SidebarProps) {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenSidebar(open);
    };
  return type === "primary" ? (
    <div className="h-full w-[320px]">
      <SidebarContent setOpenSidebar={setOpenSidebar} />
    </div>
  ) : (
    <>
      {type === "secondary" && (
        <div className="h-full text-neutral-400 px-[25px] py-[42px] ">
          <div onClick={toggleDrawer(true)} className="cursor-pointer">
            <MenuOutlinedIcon />
          </div>
        </div>
      )}

      <Drawer
        PaperProps={{
          sx: { width: "260px" },
        }}
        anchor={"left"}
        open={openSidebar}
        onClose={toggleDrawer(false)}
      >
        <SidebarContent setOpenSidebar={setOpenSidebar} type={type} />
      </Drawer>
    </>
  );
}

export default Sidebar;
