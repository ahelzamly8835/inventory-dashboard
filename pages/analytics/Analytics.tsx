import TopBar from "../../components/topbar/TopBar";
import { inventoryStats } from "../../src/data/stats";
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

const data = [
  { name: "Jan", uv: 500, amt: 2400 },
  { name: "Feb", uv: 550, amt: 2210 },
  { name: "Mar", uv: 600, amt: 2290 },
  { name: "Apr", uv: 700, amt: 2000 },
  { name: "Mai", uv: 900, amt: 2181 },
  { name: "Jun", uv: 550, amt: 2500 },
];

const dataTow = [
  { name: "Critical", value: 15 },
  { name: "Low Stock", value: 35 },
  { name: "Healthy", value: 50 },
];

const COLORS = ["#ef4444", "#facc15", "#22c55e"];

const Analytics = () => {
  return (
    <div className="p-4 sm:p-6 w-full">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Analytics</h1>
        <p className="text-[#64748B] mt-2">
          Insights into your inventory performance
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <TopBar data={inventoryStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="p-4 sm:p-5 bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <h1 className="text-lg sm:text-xl font-semibold py-2 mb-4">
            Inventory Value Trend
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
            <div className="w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataTow}
                    dataKey="value"
                    cy="50%"
                    cx="50%"
                    innerRadius="60%"
                    outerRadius="90%"
                  >
                    {dataTow.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
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

      <div className="flex flex-col bg-white rounded-xl p-4 sm:p-5 mt-6 gap-4 shadow-sm border border-slate-100">
        <h2 className="py-1 font-semibold text-lg">Key Insights</h2>

        <div className="flex items-start bg-[#3B82F61A] p-4 rounded-xl gap-3">
          <span className="text-xl text-[#3B82F6] mt-0.5 shrink-0">
            <FaRegLightbulb />
          </span>
          <div>
            <h3 className="text-[#3B82F6] font-medium mb-1">
              Inventory growing
            </h3>
            <p className="text-[#3B82F6] text-sm opacity-90">
              Your total inventory value has increased by 12.5% this month.
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
              You have 4 products below optimal stock levels. Review these items
              to prevent stockouts.
            </p>
          </div>
        </div>

        <div className="flex items-start bg-[#22C55E1A] p-4 rounded-xl gap-3">
          <span className="text-xl text-[#22C55E] mt-0.5 shrink-0">
            <IoIosCheckboxOutline />
          </span>
          <div>
            <h3 className="text-[#22C55E] font-medium mb-1">
              Inventory Healthy
            </h3>
            <p className="text-[#22C55E] text-sm opacity-90">
              Your turnover rate is stable. Fast-moving items are tracking
              correctly according to demand predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
