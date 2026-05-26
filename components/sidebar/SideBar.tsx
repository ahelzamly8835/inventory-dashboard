import Logo from "../../assets/imges/d4587bcb3ac2505b6868b8668bc34ded6ea83be5.png";
import { LuBox } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import { IoReloadSharp } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};
const SideBar = ({ open, setOpen }: Props) => {
  const handleLogout = () => {
    toast.info("Logged out");
  };
  return (
    <div
      className={`
    fixed top-0 left-0 h-screen md:h-auto w-64 bg-white px-3 flex flex-col z-50
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 md:static
  `}
    >
      <div className="border-b border-gray-200">
        <img src={Logo} alt="Logo" className="w-48" />
      </div>
      <div className="">
        <ul className="flex flex-col gap-4 mt-6">
          <Link to="/dashboard" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <MdOutlineDashboard className="text-2xl" />
              Dashboard
            </li>
          </Link>
          <Link to="/products" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <LuBox className="text-2xl" />
              Products
            </li>
          </Link>
          <Link to="/alerts" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <GrCircleAlert className="text-2xl" />
              Alerts{" "}
              <span className="flex text-white bg-red-600/80 px-2 ml-auto rounded-full">
                3
              </span>
            </li>
          </Link>
          <Link to="/reorder" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <IoReloadSharp className="text-2xl" />
              Reorder
            </li>
          </Link>
          <Link to="/suppliers" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <FiTruck className="text-2xl" />
              Suppliers
            </li>
          </Link>
          <Link to="/orders" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <FiShoppingCart className="text-2xl" />
              Orders
            </li>
          </Link>
          <Link to="/analytics" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <GrAnalytics className="text-2xl" />
              Analytics
            </li>
          </Link>
          <Link to="/settings" onClick={() => setOpen(false)}>
            <li className="flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 hover:text-[#4F46E5] rounded-xl hover:bg-[#4F46E533] duration-150 ease-in-out">
              <IoSettingsOutline className="text-2xl" />
              Settings
            </li>
          </Link>
        </ul>
      </div>
      <div className="btn mt-auto mb-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <button
            onClick={handleLogout}
            className="bg-[#EEF2FF] cursor-pointer w-full py-2 font-semibold rounded-[10px] hover:bg-[#4F46E533] duration-150 ease-in-out"
          >
            Logout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
