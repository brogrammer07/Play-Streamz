type ButtonProps = {
  icon?: React.ReactNode;
  type: "outlined" | "solid" | "normal" | "rounded";
  title: string | number;
  accent?: "red" | "white";
};

const Button: React.FC<ButtonProps> = ({ icon, type, title, accent }) => {
  return (
    <div
      className={`px-[19px] py-[6px] space-x-[10px] flex items-center cursor-pointer transition-colors justify-center  ${
        type === "solid"
          ? `${
              accent === "white"
                ? "bg-neutral-300 text-black-900 hover:bg-neutral-500 py-[13px]"
                : "bg-primary-900 text-neutral-300 hover:bg-primary-dark"
            } rounded-md `
          : type === "outlined"
          ? `border-[1px] ${
              accent === "red"
                ? "border-red-700 text-red-700 rounded-md hover:bg-red-700"
                : "border-primary-900 text-primary-900 rounded-md hover:bg-primary-900"
            }  hover:text-neutral-300`
          : type === "normal"
          ? " text-primary-900 rounded-md hover:bg-primary-900 hover:text-neutral-300"
          : "border-[1px] border-primary-900 text-primary-900 rounded-2xl hover:bg-primary-900 hover:text-neutral-300 "
      }`}
    >
      {icon}
      <p className="p1-sb ">{title}</p>
    </div>
  );
};

export default Button;
