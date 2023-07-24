import { useState, ChangeEvent } from "react";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
type InputProps = {
  type: "text" | "email" | "password" | "file";
  placeholder: string;
  title: string;
  value: any;
  boxType?: "primary" | "secondary";
  handleChange: (id: string, value: any) => void;
  id: string;
  error?: boolean;
};

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  title,
  value,
  boxType = "primary",
  handleChange,
  id,
  error,
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.value);
  };

  return (
    <>
      {boxType === "primary" ? (
        <fieldset
          className={`border-[1px] ${
            error ? "border-red-700" : "border-black-700"
          } px-[16px] pt-[8px] pb-[14px] rounded-lg w-full focus:border-primary-900`}
        >
          <legend
            className={`p3-sb ${error ? "text-red-700" : "text-neutral-700"}  `}
          >
            {title}
          </legend>
          <div className="flex gap-3">
            <input
              id={id}
              className="bg-none border-none outline-none text-neutral-300 placeholder:text-neutral-900 w-full l1-r placeholder:l2-r   "
              type={
                type === "password" ? (visibility ? "text" : "password") : type
              }
              placeholder={placeholder}
              value={value}
              onChange={handleInputChange}
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
      ) : (
        <div className="w-full">
          <input
            id={id}
            className="bg-none pb-[4px] border-b-[1px] border-b-black-600 outline-none text-neutral-300 placeholder:text-neutral-900 w-full l1-r placeholder:l2-r focus:border-b-primary-900"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  );
};

export default Input;
