import { useState } from "react";

type Status = "healthy" | "low" | "critical";

interface Product {
  id: string;
  sku: string;
  name: string;
  status: Status;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  category: string;
}

const products: Product[] = [
  {
    id: "1",
    sku: "WBH-001",
    name: "Wireless Bluetooth Headphones",
    status: "healthy",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 79.99,
    category: "Electronics",
  },
  {
    id: "2",
    sku: "OCT-6651",
    name: "Organic Cotton T-shirt",
    status: "critical",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 74.99,
    category: "Clothing",
  },
  {
    id: "3",
    sku: "SSW-021",
    name: "Stainless Steal Water Bottle",
    status: "low",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 70.99,
    category: "Electronics",
  },
  {
    id: "4",
    sku: "OCT-6651",
    name: "Organic Cotton T-shirt",
    status: "critical",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 74.99,
    category: "Clothing",
  },
  {
    id: "5",
    sku: "WBH-001",
    name: "Wireless Bluetooth Headphones",
    status: "healthy",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 79.99,
    category: "Electronics",
  },
  {
    id: "6",
    sku: "WSW-001",
    name: "Stainless Steal Water Bottle",
    status: "low",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 70.99,
    category: "Electronics",
  },
  {
    id: "7",
    sku: "WBH-001",
    name: "Wireless Bluetooth Headphones",
    status: "healthy",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 79.99,
    category: "Electronics",
  },
  {
    id: "8",
    sku: "WSW-001",
    name: "Stainless Steal Water Bottle",
    status: "low",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 70.99,
    category: "Electronics",
  },
  {
    id: "9",
    sku: "OCT-6651",
    name: "Organic Cotton T-shirt",
    status: "critical",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    price: 74.99,
    category: "Clothing",
  },
];

const statusConfig: Record<
  Status,
  {
    label: string;
    badgeClass: string;
    barClass: string;
    btnClass: string;
    btnLabel: string;
  }
> = {
  healthy: {
    label: "Healthy",
    badgeClass: "bg-green-100 text-green-700",
    barClass: "bg-green-500",
    btnClass: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    btnLabel: "Reorder",
  },
  low: {
    label: "Low",
    badgeClass: "bg-yellow-100 text-yellow-700",
    barClass: "bg-yellow-400",
    btnClass: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
    btnLabel: "Reorder",
  },
  critical: {
    label: "Critical",
    badgeClass: "bg-red-100 text-red-600",
    barClass: "bg-red-500",
    btnClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    btnLabel: "Reorder Now",
  },
};

const allStatuses = ["All Status", "Healthy", "Low", "Critical"];
const allCategories = ["All Categories", "Electronics", "Clothing"];

export default function Products() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      selectedStatus === "All Status" ||
      p.status === selectedStatus.toLowerCase();
    const matchCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  return (
    <div className="px-4">
      <div className="pt-10 px-4 ">
        <h1 className="text-xl font-semibold">Products</h1>
        <p className="text-[#64748B] mt-4">Manage your inventory items</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 md:p-6 rounded-xl my-6">
        <input
          type="text"
          placeholder="Search by name or SKU..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[50%] py-2 rounded-lg border border-[#E5E7EB] pl-4 outline-0"
        />

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-8 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {allStatuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-8 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          {allCategories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((product) => {
          const cfg = statusConfig[product.status];
          const capacityPct = Math.round(
            (product.currentStock / product.maxStock) * 100,
          );

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm text-gray-800">
                      {product.name}
                    </p>
                    <span
                      className={`text-xs px-2 py-1 rounded-lg font-medium ${cfg.badgeClass}`}
                    >
                      {cfg.label}
                      {product.status === "critical" && (
                        <span className="ml-1"></span>
                      )}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{product.sku}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <span className="text-gray-400">Current Stock</span>
                <span className="text-right text-gray-700">
                  {product.currentStock} units
                </span>
                <span className="text-gray-400">Min/Max</span>
                <span className="text-right text-gray-700">
                  {product.minStock} / {product.maxStock}
                </span>
                <span className="text-gray-400">Price</span>
                <span className="text-right text-gray-700">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-400">Category</span>
                <span className="text-right text-gray-700">
                  {product.category}
                </span>
              </div>

              <div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cfg.barClass}`}
                    style={{ width: `${capacityPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {capacityPct}% Capacity
                </p>
              </div>

              <button
                className={`w-full cursor-pointer py-2 rounded-lg text-sm font-medium transition-colors ${cfg.btnClass}`}
              >
                {cfg.btnLabel}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-10">
          No products found.
        </p>
      )}
    </div>
  );
}
