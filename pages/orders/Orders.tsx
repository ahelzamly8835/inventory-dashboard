import TopBar from "../../components/topbar/TopBar";
import { ordersStats } from "../../src/data/stats";
const Orders = () => {
  return (
    <div>
      <div className="mx-10 mt-10">
        <h1 className="text-xl font-semibold">Orders</h1>
        <p className="text-[#64748B] mt-4 mb-6">Track your purchase orders</p>
      </div>

      <div>
        <TopBar data={ordersStats} />
      </div>

      <div className="bg-white p-6 rounded-xl flex flex-col gap-6 mt-6 md:mx-10">
        <h2 className="font-bold text-2xl">Recent Orders</h2>
        <div className="bg-[#F8FAFC] p-6 rounded-lg flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <h3 className="font-medium">Organic Cotton T-shirt</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#3B82F6] text-white">
              Shipped
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Order #ord-1 • EcoGoods Manufacturing
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <p className="text-gray-400">Quantity</p>
              <p>50 units</p>
            </div>

            <div>
              <p className="text-gray-400">Total Cost</p>
              <p>$1250.50</p>
            </div>

            <div>
              <p className="text-gray-400">Order Date</p>
              <p>Feb 20, 2026</p>
            </div>

            <div>
              <p className="text-gray-400">Expected Date</p>
              <p>Feb 27, 2026</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button className="px-3 py-1 bg-[#E5E7EB] rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-black cursor-pointer">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <h3 className="font-medium">Organic Cotton T-shirt</h3>
            <span className="text-xs px-2 py-1 rounded-full text-white bg-[#22C55E]">
              Confirmed
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Order #ord-1 • EcoGoods Manufacturing
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Quantity</p>
              <p>50 units</p>
            </div>

            <div>
              <p className="text-gray-400">Total Cost</p>
              <p>$1250.50</p>
            </div>

            <div>
              <p className="text-gray-400">Order Date</p>
              <p>Feb 20, 2026</p>
            </div>

            <div>
              <p className="text-gray-400">Expected Date</p>
              <p>Feb 27, 2026</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button className="px-3 py-1 bg-[#E5E7EB] rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-black cursor-pointer">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-6 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <h3 className="font-medium">Organic Cotton T-shirt</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#F59E0B] text-white">
              Pending
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Order #ord-1 • EcoGoods Manufacturing
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Quantity</p>
              <p>50 units</p>
            </div>

            <div>
              <p className="text-gray-400">Total Cost</p>
              <p>$1250.50</p>
            </div>

            <div>
              <p className="text-gray-400">Order Date</p>
              <p>Feb 20, 2026</p>
            </div>

            <div>
              <p className="text-gray-400">Expected Date</p>
              <p>Feb 27, 2026</p>
            </div>
          </div>

          <div className="flex gap-3 mt-2">
            <button className="px-3 py-1 bg-[#E5E7EB] rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-black cursor-pointer">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
