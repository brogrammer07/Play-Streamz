import { ChangeEvent, FC } from "react";
import Button from "../button";

interface InputFileProps {
  accept: string;
  label: string;
  handleChange: (id: string, value: any) => void;
  id: string;
}

const InputFile: FC<InputFileProps> = ({ accept, handleChange, id, label }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(id, e.target.files && e.target.files[0]);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <button className="btn border-[1px] border-primary-900 text-primary-900 hover:bg-primary-900 rounded-md hover:text-neutral-300 cursor-pointer">
        <label htmlFor={id} className="l1-sb cursor-pointer ">
          {label}
        </label>
      </button>
      <input
        id={id}
        hidden
        type="file"
        accept={accept}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default InputFile;
