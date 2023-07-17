type ButtonProps = {
  icon?: React.ReactNode;
  type: "outlined" | "solid" | "normal" | "rounded" | "follow";
  title: string | number;
  accent?: "primary" | "white" | "red";
  onClick?: () => void;
};

const OutlinedButton: React.FC<ButtonProps> = ({
  accent,
  title,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`btn border-[1px] ${
        accent === "red"
          ? "border-red-700 text-red-700 hover:bg-red-700"
          : "border-primary-900 text-primary-900 hover:bg-primary-900"
      }   rounded-md   hover:text-neutral-300`}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </div>
  );
};
const SolidButton: React.FC<ButtonProps> = ({
  accent,
  title,
  icon,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`btn ${
        accent === "white"
          ? "bg-neutral-300 text-black-900 hover:bg-neutral-500 py-[13px]"
          : "bg-primary-900 text-neutral-300 hover:bg-primary-dark"
      } rounded-md `}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </div>
  );
};
const NormalButton: React.FC<ButtonProps> = ({ title, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`btn text-primary-900 rounded-md hover:bg-primary-900 hover:text-neutral-300`}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </div>
  );
};
const RoundedButton: React.FC<ButtonProps> = ({ title, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`btn border-[1px] border-primary-900 text-primary-900 rounded-2xl hover:bg-primary-900 hover:text-neutral-300 `}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({
  icon,
  type,
  title,
  accent,
  onClick,
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
        />
      )}
      {type === "normal" && (
        <NormalButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
        />
      )}
      {type === "outlined" && (
        <OutlinedButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
        />
      )}
      {type === "rounded" && (
        <RoundedButton
          icon={icon}
          title={title}
          type={type}
          accent={accent}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default Button;
