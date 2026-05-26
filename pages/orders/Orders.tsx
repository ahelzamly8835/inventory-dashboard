import TopBar from "../../components/topbar/TopBar";
import { ordersStats } from "../../src/data/stats";
const Orders = () => {
  return (
    <div className="p-6">
      <div className="pt-4">
        <h1 className="text-xl font-semibold">Orders</h1>
        <p className="text-[#64748B] my-2">Track your purchase orders</p>
      </div>

      <div className="mt-6">
        <TopBar data={ordersStats} />
      </div>

      <div className="bg-white p-5 rounded-xl flex flex-col gap-4 mt-6">
        <h2 className="font-bold mb-4 text-2xl">Recent Orders</h2>
        <div className="bg-[#EEF2FF] p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-medium">Organic Cotton T-shirt</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">
              Shipped
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
            <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-gray-600 cursor-pointer">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-[#EEF2FF] p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
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
            <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-gray-600 cursor-pointer">
              View Details
            </button>
          </div>
        </div>

        <div className="bg-[#EEF2FF] p-5 rounded-xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
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
            <button className="px-3 py-1 bg-gray-200 rounded-lg text-sm cursor-pointer">
              Track Order
            </button>
            <button className="text-sm text-gray-600 cursor-pointer">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
