import { FC, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type ChipInputProps = {
  placeholder: string;
  title: string;
  value: string[];
  handleChange: (data: {
    action: string;
    value?: string;
    idx?: number;
  }) => void;
  id: string;
};
const ChipInput: FC<ChipInputProps> = ({
  placeholder,
  title,
  value,
  handleChange,
  id,
}) => {
  const [chips, setChips] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleChange({
        action: "add",
        value: inputValue,
      });
      setInputValue("");
    }
  };

  return (
    <fieldset className="border-[1px] border-black-700 px-[16px] pt-[8px] pb-[14px] rounded-lg w-full focus:border-primary-900">
      <legend className="p3-sb text-neutral-700 ">{title}</legend>
      <div className="flex gap-3">
        <input
          id={id}
          className="bg-none border-b-[1px] border-b-black-700 pb-1 outline-none  text-neutral-300 placeholder:text-neutral-900 w-full l1-r placeholder:l2-r "
          type="text"
          placeholder={placeholder}
          onKeyDown={handleInputKeyDown}
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
      </div>
      <div className="flex flex-wrap gap-1 items-center mt-3">
        {value?.map((chip, idx) => (
          <span
            key={idx}
            className="inline-flex  items-center justify-center px-3 py-1 space-x-1 bg-primary-900 text-neutral-300 rounded-2xl"
          >
            <p className="p2-sb">{chip}</p>
            <div
              onClick={() => handleChange({ idx: idx, action: "remove" })}
              className="flex items-center rounded-full bg-neutral-300 text-black-900 cursor-pointer"
            >
              <CloseOutlinedIcon
                sx={{ width: "20px", height: "20px", padding: "2px" }}
              />
            </div>
          </span>
        ))}
      </div>
    </fieldset>
  );
};

export default ChipInput;

{
  /* <input
onKeyDown={handleInputKeyDown}
placeholder="Type and press Enter"
/> */
}
