import TopBar from "../../components/topbar/TopBar";
import { dashboardStats } from "../../src/data/stats";
import LowStockSection from "../../components/LowStockSection/LowStockSection";
import { LuBox } from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";
import { GrCircleAlert } from "react-icons/gr";
const DashBoard = () => {
  return (
    <div>
      <div className="pt-10 pl-10">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-[#64748B] my-4">
          Welcome back, Omar! Here’s your inventory overview.
        </p>
      </div>
      <TopBar data={dashboardStats} />
      <div className="">
        <LowStockSection />
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl">
          <span>
            {" "}
            <LuBox className="text-[#4F46E5] text-2xl" />
          </span>
          <h3 className="pt-3">View All Products</h3>
          <p className="text-[#64748B]">Browse and manage your inventory</p>
        </div>
        <div className="bg-white p-4 rounded-xl ">
          <span>
            {" "}
            <GrAnalytics className="text-black text-2xl" />
          </span>
          <h3 className="pt-3">Smart Reorder</h3>
          <p className="text-[#64748B]">Get AI-powered reorder suggestions </p>
        </div>
        <div className="bg-white p-4 rounded-xl ">
          <span>
            {" "}
            <GrCircleAlert className="text-[#EF4444] text-2xl" />
          </span>
          <h3 className="pt-3">View Analytics</h3>
          <p className="text-[#64748B]">Track trends and insights</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
