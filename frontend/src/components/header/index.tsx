import { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar } from "@mui/material";
import Button from "../button";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import SignInModal from "../modals/SignInModal";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";
type HeaderProps = {
  searchVal?: string | null;
  type?: "primary" | "secondary";
};

function Header({ searchVal, type = "primary" }: HeaderProps) {
  const { currentUser, logout } = useUserAuth();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();
  const searchResult = () => {
    var searchQuery: string = searchValue.replace(/\s/g, "+");
    navigate(`/search?search_query=${searchQuery}`);
  };

  useEffect(() => {
    if (searchVal) setSearchValue(searchVal);
  }, [searchVal]);

  return (
    <>
      <div
        className={`flex items-center ${
          type === "primary" ? "justify-end space-x-[25%]" : "justify-between"
        }`}
      >
        {type === "secondary" && (
          <div className="capitalize font-Julius-Sans-One text-neutral-300">
            PLAY STREAMZ
          </div>
        )}
        <div className="w-[540px] rounded-2xl border-[1px] border-black-700 pl-[24px] pr-[10px] text-neutral-500 flex items-center">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchResult();
              }
            }}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type to search..."
            className="bg-none placeholder:text-neutral-900 outline-none py-[15px] pr-[24px] w-full"
          />
          <div
            onClick={searchResult}
            className="px-[6px] py-[4px] bg-primary-900 rounded-full h-full cursor-pointer"
          >
            <SearchOutlinedIcon className="" />
          </div>
        </div>
        {currentUser ? (
          <div onClick={() => logout()}>
            <Avatar
              src={currentUser.photoURL || ""}
              sx={{ width: "54px", height: "54px" }}
            />
          </div>
        ) : (
          <div onClick={() => setOpenModal(true)} className="">
            <Button
              title="Sign in"
              type="rounded"
              icon={<LoginOutlinedIcon />}
            />
          </div>
        )}
      </div>
      <SignInModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Header;
