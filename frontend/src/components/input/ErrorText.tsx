import { FC } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
interface ErrorTextProps {
  text: string;
}

const ErrorText: FC<ErrorTextProps> = ({ text }) => {
  return (
    <div className="flex items-center gap-1">
      <ErrorOutlineOutlinedIcon className="text-red-700" />
      <p className="text-red-700 p3-sb">{text}</p>
    </div>
  );
};

export default ErrorText;
