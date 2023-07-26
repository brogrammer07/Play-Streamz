import { ToastContainer } from "react-toastify";
import Header from "../header";
import Sidebar from "../sidebar";
import "react-toastify/dist/ReactToastify.css";
interface LayoutPrimaryProps {
  children: React.ReactNode;
  searchVal?: string | null;
  type?: "primary" | "secondary";
}
const LayoutPrimary: React.FunctionComponent<LayoutPrimaryProps> = ({
  children,
  searchVal,
  type = "primary",
}) => {
  return (
    <div className="bg-black-900 h-screen w-full flex overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
      />
      <Sidebar type={type} />
      <div className="w-full px-[25px] py-[30px] flex flex-col space-y-[74px]">
        <Header type={type} searchVal={searchVal} />
        {children}
      </div>
    </div>
  );
};

export default LayoutPrimary;
