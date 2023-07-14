import Header from "../header";
import Sidebar from "../sidebar";
interface LayoutPrimaryProps {
  children: React.ReactNode;
}
const LayoutPrimary: React.FunctionComponent<LayoutPrimaryProps> = (
  props: LayoutPrimaryProps
) => {
  return (
    <div className="bg-black-900 h-screen w-full flex overflow-hidden">
      <Sidebar />
      <div className="w-full px-[25px] py-[30px] flex flex-col space-y-[74px]">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default LayoutPrimary;
