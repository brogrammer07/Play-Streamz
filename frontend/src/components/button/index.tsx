import CircularProgress from "@mui/material/CircularProgress";
type ButtonProps = {
  icon?: React.ReactNode;
  type: "outlined" | "solid" | "normal" | "rounded" | "follow";
  title: string | number;
  accent?: "primary" | "white" | "red";
  onClick?: () => void;
  buttonAction?: "button" | "submit" | "reset" | undefined;
  loading?: boolean;
  disabled?: boolean;
};

const OutlinedButton: React.FC<ButtonProps> = ({
  accent,
  title,
  icon,
  onClick,
  buttonAction,
  loading,
}) => {
  return (
    <button
      type={buttonAction}
      onClick={onClick}
      className={`btn border-[1px] ${
        accent === "red"
          ? "border-red-700 text-red-700 hover:bg-red-700"
          : "border-primary-900 text-primary-900 hover:bg-primary-900"
      }   rounded-md   hover:text-neutral-300`}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
      {loading && (
        <CircularProgress
          sx={{ color: accent === "red" ? "A01819" : "#D48F2F" }}
          size={20}
        />
      )}
    </button>
  );
};
const SolidButton: React.FC<ButtonProps> = ({
  accent,
  title,
  icon,
  onClick,
  buttonAction,
  loading,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={buttonAction}
      onClick={onClick}
      className={`btn ${
        accent === "white"
          ? "bg-neutral-300 text-black-900 hover:bg-neutral-500 py-[13px]"
          : `${
              disabled
                ? "bg-neutral-800 text-neutral-900 hover:cursor-not-allowed"
                : "bg-primary-900 text-neutral-300 hover:bg-primary-dark"
            }`
      } rounded-md transition-all duration-150 `}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
      {loading && (
        <CircularProgress
          sx={{ color: accent === "white" ? "#0F0F0D" : "#ffffff" }}
          size={20}
        />
      )}
    </button>
  );
};
const NormalButton: React.FC<ButtonProps> = ({
  title,
  icon,
  onClick,
  buttonAction,
}) => {
  return (
    <button
      type={buttonAction}
      onClick={onClick}
      className={`btn text-primary-900 rounded-md hover:bg-primary-900 hover:text-neutral-300`}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </button>
  );
};
const RoundedButton: React.FC<ButtonProps> = ({
  title,
  icon,
  onClick,
  buttonAction,
}) => {
  return (
    <button
      type={buttonAction}
      onClick={onClick}
      className={`btn border-[1px] border-primary-900 text-primary-900 rounded-2xl hover:bg-primary-900 hover:text-neutral-300 `}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </button>
  );
};

const Button: React.FC<ButtonProps> = ({
  icon,
  type,
  title,
  accent,
  onClick,
  buttonAction,
  loading,
  disabled,
}) => {
  return (
    <>
      {type === "solid" && (
        <SolidButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
          buttonAction={buttonAction}
          loading={loading}
          disabled={disabled}
        />
      )}
      {type === "normal" && (
        <NormalButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
          buttonAction={buttonAction}
        />
      )}
      {type === "outlined" && (
        <OutlinedButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
          buttonAction={buttonAction}
          loading={loading}
        />
      )}
      {type === "rounded" && (
        <RoundedButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
          buttonAction={buttonAction}
        />
      )}
    </>
  );
};

export default Button;
