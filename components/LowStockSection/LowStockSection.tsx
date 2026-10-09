import { useProducts } from "../../src/hooks/useProducts";

export default function LowStockSection() {
  const { data: products = [] } = useProducts();

  const lowStockItems = products
    .filter((p) => p.status === "low" || p.status === "critical")
    .sort((a, b) => a.currentStock - a.minStock - (b.currentStock - b.minStock))
    .slice(0, 5);

  return (
    <div className="mt-6 bg-white p-4 rounded-xl shadow flex flex-col gap-4 md:mx-10">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold md:p-6">Low Stock Alerts</h2>
        <button className="text-sm flex items-center gap-2 cursor-pointer px-10">
          View All <span>→</span>
        </button>
      </div>

      <div className="flex flex-col gap-3 md:px-6">
        {lowStockItems.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-4">
            All products are well stocked.
          </p>
        )}

        {lowStockItems.map((item) => {
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
                  Current: {item.currentStock} Units • Min: {item.minStock} Units
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