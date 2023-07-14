import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "../button";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SignInModal from "../modals/SignInModal";
function Header() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center justify-end space-x-[25%]">
        <div className="w-[540px] rounded-2xl border-[1px] border-black-700 pl-[24px] text-neutral-500 flex items-center space-x-[15px]">
          <SearchOutlinedIcon className="" />
          <input
            type="text"
            placeholder="Search"
            className="bg-none placeholder:text-neutral-900 outline-none py-[15px] pr-[24px] w-full"
          />
        </div>
        <div onClick={() => setOpenModal(true)} className="">
          <Button title="Sign in" type="rounded" icon={<LoginOutlinedIcon />} />
        </div>
      </div>
      <SignInModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Header;
