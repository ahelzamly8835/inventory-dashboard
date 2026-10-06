import { useState } from "react";
import { toast } from "react-toastify";
import { GrCircleAlert } from "react-icons/gr";
import { IoAlert } from "react-icons/io5";
import {
  useProducts,
  useDeleteProduct,
  type Product,
  type Status,
} from "../../src/hooks/useProducts";
import { useDebounce } from "../../src/hooks/useDebounce";
import AddProductModal from "./AddProductModal";
import ConfirmModal from "./ConfirmModal";

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
    badgeClass: "bg-[#22C55E24] text-[#22C55E] border border-[#22C55E]",
    barClass: "bg-green-500",
    btnClass: "bg-[#EEF2FF] border border-[#E5E7EB] text-gray-700",
    btnLabel: "Reorder",
  },
  low: {
    label: "Low",
    badgeClass: "bg-[#F59E0B24] text-[#F59E0B] border border-[#F59E0B]",
    barClass: "bg-yellow-400",
    btnClass: "bg-[#EEF2FF] border border-[#E5E7EB] text-gray-700",
    btnLabel: "Reorder",
  },
  critical: {
    label: "Critical",
    badgeClass: "bg-[#EF444424] text-[#EF4444] border border-[#EF4444]",
    barClass: "bg-red-500",
    btnClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    btnLabel: "Reorder Now",
  },
};

const allStatuses = ["All Status", "Healthy", "Low", "Critical"];
const allCategories = ["All Categories", "Electronics", "Clothing"];

export default function Products() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(
    null,
  );

  const { data: products = [], isLoading, error } = useProducts(debouncedSearch);
  const deleteProduct = useDeleteProduct();

  const confirmDelete = () => {
    if (!toDelete) return;

    deleteProduct.mutate(toDelete.id, {
      onSuccess: () => toast.success("Product deleted"),
      onError: (err) => toast.error(`Delete failed: ${err.message}`),
    });
    setToDelete(null);
  };

  const filtered = products.filter((p) => {
    const matchStatus =
      selectedStatus === "All Status" ||
      p.status === selectedStatus.toLowerCase();
    const matchCategory =
      selectedCategory === "All Categories" || p.category === selectedCategory;
    return matchStatus && matchCategory;
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-400 mt-10">Loading products...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load products: {error.message}
      </p>
    );
  }

  return (
    <div className="">
      <div className="mt-8 mx-10 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Products</h1>
          <p className="text-[#64748B] mt-4 mb-6">Manage your inventory items</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="bg-[#4F46E5] text-white rounded-xl px-5 py-2 font-medium cursor-pointer hover:bg-[#3731a7] duration-150 ease-in-out"
        >
          Add Product
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 md:p-6 rounded-xl my-6 mx-10">
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
          className="px-8  py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
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
                      className={`text-xs flex items-center px-2 py-1 rounded-full font-medium ${cfg.badgeClass}`}
                    >
                      {product.status === "low" && <IoAlert />}
                      {cfg.label}
                      {product.status === "critical" && (
                        <GrCircleAlert className="ml-2 text-lg" />
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
              <button
                onClick={() => setEditing(product)}
                className="w-full cursor-pointer py-2 rounded-lg text-sm font-medium border border-[#E5E7EB] text-gray-700 hover:bg-gray-50 duration-150 ease-in-out"
              >
                Edit
              </button>
              <button
                onClick={() =>
                  setToDelete({ id: product.id, name: product.name })
                }
                disabled={deleteProduct.isPending}
                className="w-full cursor-pointer py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 duration-150 ease-in-out disabled:opacity-50"
              >
                Delete
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

      <AddProductModal
        key={editing?.id ?? (showAdd ? "add" : "closed")}
        open={showAdd || editing !== null}
        product={editing ?? undefined}
        onClose={() => {
          setShowAdd(false);
          setEditing(null);
        }}
      />

      <ConfirmModal
        open={toDelete !== null}
        title="Delete product"
        message={`Are you sure you want to delete "${toDelete?.name}"? This can't be undone.`}
        confirmLabel="Delete"
        loading={deleteProduct.isPending}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}