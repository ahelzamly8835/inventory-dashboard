import { Link } from "react-router-dom";
import { GrCircleAlert } from "react-icons/gr";
import { useProducts } from "../../src/hooks/useProducts";

const Alerts = () => {
  const { data: products = [], isLoading, error } = useProducts();

  const alerts = products
    .filter((p) => p.status === "low" || p.status === "critical")
    .sort((a, b) => a.currentStock - a.minStock - (b.currentStock - b.minStock));

  if (isLoading) {
    return <p className="text-center text-gray-400 mt-10">Loading alerts...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load alerts: {error.message}
      </p>
    );
  }

  return (
    <div className="md:mx-10 mt-8">
      <div className="mx-4 md:mx-0 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Stock Alerts</h1>
      </div>
      <p className="text-[#64748B] mt-4 mb-6 mx-4 md:mx-0">
        {alerts.length === 0
          ? "No active alerts"
          : `${alerts.length} ${alerts.length === 1 ? "alert needs" : "alerts need"} attention`}
      </p>

      {alerts.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-10">
          All products are well stocked.
        </p>
      )}

      <div className="flex flex-col gap-6">
        {alerts.map((item) => {
          const isCritical = item.status === "critical";

          return (
            <div
              key={item.id}
              className="py-6 px-10 rounded-xl shadow transition flex flex-col gap-3 bg-white hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <GrCircleAlert
                  className={`text-xl ${
                    isCritical ? "text-[#EF4444]" : "text-[#F59E0B]"
                  }`}
                />
                <h2 className="font-medium">{item.name}</h2>
              </div>

              <span
                className={`text-xs ml-6 px-2 py-1 rounded-full w-fit ${
                  isCritical
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {isCritical ? "Critical Stock" : "Low Stock"}
              </span>

              <p className="text-sm ml-6 text-gray-500">
                {isCritical
                  ? "Critical stock level!"
                  : "Stock is running low."}{" "}
                Only {item.currentStock} units remaining (minimum{" "}
                {item.minStock}).
              </p>

              <div className="flex gap-3 ml-6 flex-wrap">
                <Link
                  to="/products"
                  className="text-sm rounded-xl cursor-pointer bg-[#4F46E5] text-white px-3 py-1 hover:opacity-90 transition"
                >
                  View in Products
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;