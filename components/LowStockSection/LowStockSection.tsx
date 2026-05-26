import type { LowStockItem } from "../../src/dataAlerts/lowStockAlerts";
import { lowStockAlerts } from "../../src/dataAlerts/lowStockAlerts";

export default function LowStockSection() {
  return (
    <div className="mt-10 bg-white p-4 rounded-xl shadow flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">Low Stock Alerts</h2>
        <button className="text-sm text-blue-600 flex items-center gap-1">
          View All <span>→</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {lowStockAlerts.map((item: LowStockItem) => {
          const isCritical = item.status === "critical";

          return (
            <div
              key={item.id}
              className="bg-[#EEF2FF] rounded-lg p-4 flex justify-between items-center"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{item.name}</p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isCritical
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {isCritical ? "! Critical" : "! Low"}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Current: {item.current} Units • Min: {item.min} Units
                </p>
              </div>
              <button className="bg-[#3B82F6] cursor-pointer hover:bg-[#366abe] text-white text-sm px-4 py-2 rounded-lg transition-colors">
                Reorder
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
