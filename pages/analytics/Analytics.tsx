import TopBar from "../../components/topbar/TopBar";
import { inventoryStats } from "../../src/data/stats";
import { useProducts } from "../../src/hooks/useProducts";
import { FaRegLightbulb } from "react-icons/fa";
import { TbInfoTriangle } from "react-icons/tb";
import { IoIosCheckboxOutline } from "react-icons/io";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, LabelList } from "recharts";

// Sample data: the database keeps no history, so this trend can't be real yet.
const data = [
  { name: "Jan", uv: 500, amt: 2400 },
  { name: "Feb", uv: 550, amt: 2210 },
  { name: "Mar", uv: 600, amt: 2290 },
  { name: "Apr", uv: 700, amt: 2000 },
  { name: "Mai", uv: 900, amt: 2181 },
  { name: "Jun", uv: 550, amt: 2500 },
];

const money = (n: number) =>
  `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Analytics = () => {
  const { data: products = [], isLoading } = useProducts();

  const total = products.length;
  const critical = products.filter((p) => p.status === "critical").length;
  const low = products.filter((p) => p.status === "low").length;
  const healthy = products.filter((p) => p.status === "healthy").length;
  const alerts = critical + low;

  const stockValue = products.reduce(
    (sum, p) => sum + p.price * p.currentStock,
    0,
  );

  const avgStockLevel = total
    ? (products.reduce(
        (sum, p) => sum + (p.maxStock ? p.currentStock / p.maxStock : 0),
        0,
      ) /
        total) *
      100
    : 0;

  const stats = inventoryStats.map((s) => {
    if (s.id === 1) {
      return { ...s, value: money(stockValue), subText: "Current stock value" };
    }
    if (s.id === 2) {
      return {
        ...s,
        value: `${avgStockLevel.toFixed(1)}%`,
        subText: "Of max capacity",
      };
    }
    if (s.id === 3) {
      return { ...s, value: total };
    }
    return { ...s, value: alerts };
  });

  const pct = (n: number) => (total ? Math.round((n / total) * 100) : 0);

  const pieData = [
    { name: "Critical", value: pct(critical), color: "#ef4444" },
    { name: "Low Stock", value: pct(low), color: "#facc15" },
    { name: "Healthy", value: pct(healthy), color: "#22c55e" },
  ].filter((d) => d.value > 0);

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-10">Loading...</p>;
  }

  return (
    <div className="md:mx-10">
      <div className="mx-10 mt-10">
        <h1 className="text-xl sm:text-2xl font-semibold">Analytics</h1>
        <p className="text-[#64748B] mb-6 mt-4">
          Insights into your inventory performance
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <TopBar data={stats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 md:mx-10">
        <div className="p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h1 className="text-lg sm:text-xl font-semibold py-2 mb-4">
            Inventory Value Trend
            <span className="text-xs font-normal text-slate-400 ml-2">
              sample data
            </span>
          </h1>
          <div className="w-full h-[300px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 1"
                  stroke="#E2E8F0"
                  strokeWidth={1}
                />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis
                  width={50}
                  tickMargin={8}
                  allowDecimals={false}
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#E2E8F0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#7987FF"
                  strokeWidth={2}
                  dot={{ fill: "#fff", stroke: "#7987FF", strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <h1 className="text-lg sm:text-xl font-semibold py-2">
            Stock Status Breakdown
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 h-full py-4">
            <div className="w-60 h-60 sm:w-[280px] sm:h-[280px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cy="50%"
                    cx="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                  >
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <LabelList
                      dataKey="value"
                      position="inside"
                      fill="#fff"
                      fontSize={12}
                      fontWeight="bold"
                      formatter={(value) => `${value}%`}
                    />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex sm:flex-col flex-row flex-wrap justify-center gap-4 sm:gap-3 text-sm font-medium w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#22C55E] rounded-full shrink-0"></span>
                <span className="text-slate-600">Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#facc15] rounded-full shrink-0"></span>
                <span className="text-slate-600">Low Stock</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#EF4444] rounded-full shrink-0"></span>
                <span className="text-slate-600">Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white rounded-xl p-6  mt-6 md:mx-10 gap-6 shadow-sm border border-slate-100">
        <h2 className="font-semibold text-lg">Key Insights</h2>

        <div className="flex items-start bg-[#3B82F61A] p-4 rounded-xl gap-3">
          <span className="text-xl text-[#3B82F6] mt-0.5 shrink-0">
            <FaRegLightbulb />
          </span>
          <div>
            <h3 className="text-[#3B82F6] font-medium mb-1">Inventory value</h3>
            <p className="text-[#3B82F6] text-sm opacity-90">
              Your stock is worth {money(stockValue)} across {total} products.
              Consider optimizing reorder quantities to avoid overstocking.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-[#F59E0B1A] p-4 rounded-xl gap-3">
          <span className="text-xl text-[#F59E0B] mt-0.5 shrink-0">
            <TbInfoTriangle />
          </span>
          <div>
            <h3 className="text-[#F59E0B] font-medium mb-1">Low Stock Items</h3>
            <p className="text-[#F59E0B] text-sm opacity-90">
              {alerts === 0
                ? "No products are below optimal stock levels."
                : `You have ${alerts} ${
                    alerts === 1 ? "product" : "products"
                  } below optimal stock levels. Review these items to prevent stockouts.`}
            </p>
          </div>
        </div>

        <div className="flex items-start bg-[#22C55E1A] p-4 rounded-xl gap-3">
          <span className="text-xl text-[#22C55E] mt-0.5 shrink-0">
            <IoIosCheckboxOutline />
          </span>
          <div>
            <h3 className="text-[#22C55E] font-medium mb-1">
              Healthy inventory
            </h3>
            <p className="text-[#22C55E] text-sm opacity-90">
              {healthy} of {total} products are at healthy stock levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;