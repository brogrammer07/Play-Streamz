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
      <label htmlFor={id}>
        <Button type="outlined" title={label} />
        <input
          id={id}
          hidden
          type="file"
          accept={accept}
          onChange={handleInputChange}
        />
      </label>
    </div>
  );
};

export default InputFile;
