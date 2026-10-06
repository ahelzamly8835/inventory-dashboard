import {useState } from "react";
import { toast } from "react-toastify";
import {
  useAddProduct,
  useUpdateProduct,
  type Product,
} from "../../src/hooks/useProducts";

type Props = {
  open: boolean;
  product?: Product;
  onClose: () => void;
};

const emptyForm = {
  name: "",
  sku: "",
  category: "",
  price: "",
  currentStock: "",
  minStock: "",
  maxStock: "",
};

const toForm = (p: Product) => ({
  name: p.name,
  sku: p.sku,
  category: p.category,
  price: String(p.price),
  currentStock: String(p.currentStock),
  minStock: String(p.minStock),
  maxStock: String(p.maxStock),
});

export default function AddProductModal({ open, product, onClose }: Props) {
const [form, setForm] = useState(() =>
  product ? toForm(product) : emptyForm,
);
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const isEdit = product !== undefined;
  const isPending = addProduct.isPending || updateProduct.isPending;


  if (!open) return null;

  const setField = (field: keyof typeof emptyForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const minStock = Number(form.minStock);
    const maxStock = Number(form.maxStock);

    if (minStock > maxStock) {
      toast.error("Min stock cannot be greater than max stock");
      return;
    }

    const data = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category: form.category.trim(),
      price: Number(form.price),
      currentStock: Number(form.currentStock),
      minStock,
      maxStock,
    };

    const callbacks = {
      onSuccess: () => {
        toast.success(isEdit ? "Product updated" : "Product added");
        onClose();
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    };

    if (isEdit) {
      updateProduct.mutate({ id: product.id, ...data }, callbacks);
    } else {
      addProduct.mutate(data, callbacks);
    }
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-[#E5E7EB] outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-xl p-6 flex flex-col gap-3"
      >
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>

        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
          className={inputClass}
        />
        <input
          required
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setField("sku", e.target.value)}
          className={inputClass}
        />
        <input
          required
          placeholder="Category"
          value={form.category}
          onChange={(e) => setField("category", e.target.value)}
          className={inputClass}
        />
        <input
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setField("price", e.target.value)}
          className={inputClass}
        />
        <div className="grid grid-cols-3 gap-3">
          <input
            required
            type="number"
            min="0"
            placeholder="Stock"
            value={form.currentStock}
            onChange={(e) => setField("currentStock", e.target.value)}
            className={inputClass}
          />
          <input
            required
            type="number"
            min="0"
            placeholder="Min"
            value={form.minStock}
            onChange={(e) => setField("minStock", e.target.value)}
            className={inputClass}
          />
          <input
            required
            type="number"
            min="1"
            placeholder="Max"
            value={form.maxStock}
            onChange={(e) => setField("maxStock", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-[#EEF2FF] font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-2 rounded-lg bg-[#4F46E5] text-white font-medium cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEdit ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}