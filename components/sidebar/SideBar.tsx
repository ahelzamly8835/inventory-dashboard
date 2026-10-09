import Logo from "../../assets/imges/d4587bcb3ac2505b6868b8668bc34ded6ea83be5.png";
import { LuBox } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { GrCircleAlert } from "react-icons/gr";
import { IoReloadSharp } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { GrAnalytics } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../src/lib/supabase";
import { useProducts } from "../../src/hooks/useProducts";
type Props = {
  open: boolean;
  setOpen: (val: boolean) => void;
};
const SideBar = ({ open, setOpen }: Props) => {
  const navigate = useNavigate();
  const { data: products = [] } = useProducts();
  const alertCount = products.filter(
    (p) => p.status === "low" || p.status === "critical",
  ).length;
  const handleLogout = async () => {
    setOpen(false);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.info("Logged out");
    navigate("/");
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
          <NavLink to="/dashboard" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <MdOutlineDashboard className="text-2xl" />
                Dashboard
              </li>
            )}
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <LuBox className="text-2xl" />
                Products
              </li>
            )}
          </NavLink>

          <NavLink to="/alerts" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <GrCircleAlert className="text-2xl" />
                Alerts{" "}
                {alertCount > 0 && (
                  <span className="flex text-white bg-red-600/80 px-2 ml-auto rounded-full">
                    {alertCount}
                  </span>
                )}
              </li>
            )}
          </NavLink>
          <NavLink to="/reorder" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <IoReloadSharp className="text-2xl" />
                Reorder
              </li>
            )}
          </NavLink>
          <NavLink to="/suppliers" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <FiTruck className="text-2xl" />
                Suppliers
              </li>
            )}
          </NavLink>
          <NavLink to="/orders" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <FiShoppingCart className="text-2xl" />
                Orders
              </li>
            )}
          </NavLink>
          <NavLink to="/analytics" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <GrAnalytics className="text-2xl" />
                Analytics
              </li>
            )}
          </NavLink>
          <NavLink to="/settings" onClick={() => setOpen(false)}>
            {({ isActive }) => (
              <li
                className={`flex items-center gap-1 font-semibold cursor-pointer py-3 px-2 rounded-xl duration-150 ease-in-out ${isActive
                  ? "bg-[#4F46E533] text-[#4F46E5]"
                  : "hover:bg-[#4F46E533] hover:text-[#4F46E5]"
                  }`}
              >
                <IoSettingsOutline className="text-2xl" />
                Settings
              </li>
            )}
          </NavLink>
        </ul>
      </div>
      <div className="btn mt-auto mb-4">
        <button
          onClick={handleLogout}
          className="bg-[#EEF2FF] cursor-pointer w-full py-2 font-semibold rounded-[10px] hover:bg-[#4F46E533] duration-150 ease-in-out">
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
