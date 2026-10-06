import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export type Status = "healthy" | "low" | "critical";

export interface Product {
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

export type NewProduct = Omit<Product, "id" | "status">;

function getStatus(current: number, min: number): Status {
  if (current < min) return "critical";
  if (current <= min * 1.5) return "low";
  return "healthy";
}

async function fetchProducts(search: string): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const term = search.trim().replace(/[%_,()\\]/g, " ");
  if (term) {
    query = query.or(`name.ilike.%${term}%,sku.ilike.%${term}%`);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data.map((row) => ({
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category ?? "",
    price: Number(row.price),
    currentStock: row.current_stock,
    minStock: row.min_stock,
    maxStock: row.max_stock,
    status: getStatus(row.current_stock, row.min_stock),
  }));
}

export function useProducts(search = "") {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
    placeholderData: keepPreviousData,
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (p: NewProduct) => {
      const { error } = await supabase.from("products").insert({
        sku: p.sku,
        name: p.name,
        category: p.category,
        price: p.price,
        current_stock: p.currentStock,
        min_stock: p.minStock,
        max_stock: p.maxStock,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...p }: NewProduct & { id: string }) => {
      const { error } = await supabase
        .from("products")
        .update({
          sku: p.sku,
          name: p.name,
          category: p.category,
          price: p.price,
          current_stock: p.currentStock,
          min_stock: p.minStock,
          max_stock: p.maxStock,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    networkMode: "always",
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });

      const previous = queryClient.getQueriesData<Product[]>({
        queryKey: ["products"],
      });

      queryClient.setQueriesData<Product[]>(
        { queryKey: ["products"] },
        (old) => old?.filter((p) => p.id !== id),
      );

      return { previous };
    },
    onError: (_error, _id, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}