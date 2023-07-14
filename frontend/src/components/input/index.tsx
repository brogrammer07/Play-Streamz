import { Dispatch, SetStateAction, useState } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
type InputProps = {
  type: "text" | "email" | "password";
  placeholder: string;
  title: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  title,
  value,
  setValue,
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  return (
    <fieldset className="border-[1px] border-black-700 px-[16px] pt-[8px] pb-[14px] rounded-lg w-full">
      <legend className="p3-sb text-neutral-700 ">{title}</legend>
      <div className="flex gap-3">
        <input
          className="bg-none border-none outline-none text-neutral-300 placeholder:text-neutral-900 w-full l1-r placeholder:l2-r"
          type={type === "password" ? (visibility ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {type === "password" &&
          (!visibility ? (
            <div
              onClick={() => setVisibility(!visibility)}
              className="text-neutral-900 cursor-pointer"
            >
              <VisibilityOffOutlinedIcon />
            </div>
          ) : (
            <div
              onClick={() => setVisibility(!visibility)}
              className="text-neutral-900 cursor-pointer"
            >
              <VisibilityOutlinedIcon />
            </div>
          ))}
      </div>
    </fieldset>
  );
};

export default Input;
