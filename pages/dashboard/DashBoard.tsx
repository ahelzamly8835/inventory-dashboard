import TopBar from "../../components/topbar/TopBar";
import { dashboardStats } from "../../src/data/stats";
import {
  useProducts,
  type Status,
} from "../../src/hooks/useProducts";
import LowStockSection from "../../components/LowStockSection/LowStockSection";
import { LuBox } from "react-icons/lu";
import { GrAnalytics } from "react-icons/gr";
import { GrCircleAlert } from "react-icons/gr";

const DashBoard = () => {
  const { data: products = [], isLoading } = useProducts();

  const count = (status: Status) =>
    products.filter((p) => p.status === status).length;

  const stockValue = products.reduce(
    (sum, p) => sum + p.price * p.currentStock,
    0,
  );

  const stats = dashboardStats
    .filter((s) => s.id !== 4)
    .map((s) => {
      if (s.id === 1) {
        return {
          ...s,
          value: products.length,
          subItems: [
            { label: "healthy", value: count("healthy"), type: "success" as const },
            { label: "low", value: count("low"), type: "warning" as const },
            { label: "critical", value: count("critical"), type: "danger" as const },
          ],
        };
      }
      if (s.id === 2) {
        return {
          ...s,
          value: `$${stockValue.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
        };
      }
      if (s.id === 3) {
        return { ...s, value: count("low") + count("critical") };
      }
      return s;
    });

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  return (
    <div>
      <div className="pt-14 pl-10">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-[#64748B] mt-4 mb-6">
          Welcome back, Omar! Here’s your inventory overview.
        </p>
      </div>
      <TopBar data={stats} />
      <div className="">
        <LowStockSection />
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:px-10 md:mb-10">
        <div className="bg-white p-4 rounded-xl">
          <span>
            {" "}
            <LuBox className="text-[#4F46E5] text-2xl" />
          </span>
          <h3 className="py-2">View All Products</h3>
          <p className="text-[#64748B]">Browse and manage your inventory</p>
        </div>
        <div className="bg-white p-4 rounded-xl ">
          <span>
            {" "}
            <GrAnalytics className="text-black text-2xl" />
          </span>
          <h3 className="py-2">Smart Reorder</h3>
          <p className="text-[#64748B]">Get AI-powered reorder suggestions </p>
        </div>
        <div className="bg-white p-4 rounded-xl ">
          <span>
            {" "}
            <GrCircleAlert className="text-[#EF4444] text-2xl" />
          </span>
          <h3 className="py-2">View Analytics</h3>
          <p className="text-[#64748B]">Track trends and insights</p>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;