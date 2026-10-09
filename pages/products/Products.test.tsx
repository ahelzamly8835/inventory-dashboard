import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Products from "./Products";
import { useProducts } from "../../src/hooks/useProducts";

vi.mock("../../src/hooks/useProducts", () => ({
  useProducts: vi.fn(),
  useDeleteProduct: () => ({ mutate: vi.fn(), isPending: false }),
  useAddProduct: () => ({ mutate: vi.fn(), isPending: false }),
  useUpdateProduct: () => ({ mutate: vi.fn(), isPending: false }),
}));

const mockUseProducts = (value: object) => {
  vi.mocked(useProducts).mockReturnValue(
    value as unknown as ReturnType<typeof useProducts>,
  );
};

const sampleProducts = [
  {
    id: "1",
    sku: "WBH-001",
    name: "Wireless Headphones",
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
    name: "Cotton T-shirt",
    status: "critical",
    currentStock: 5,
    minStock: 20,
    maxStock: 100,
    price: 74.99,
    category: "Clothing",
  },
];

describe("Products page", () => {
  it("shows a loading message while fetching", () => {
    mockUseProducts({ data: undefined, isLoading: true, error: null });
    render(<Products />);

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("shows the error message when the request fails", () => {
    mockUseProducts({
      data: undefined,
      isLoading: false,
      error: new Error("boom"),
    });
    render(<Products />);

    expect(screen.getByText(/Failed to load products: boom/)).toBeInTheDocument();
  });

  it("shows an empty state when there are no products", () => {
    mockUseProducts({ data: [], isLoading: false, error: null });
    render(<Products />);

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("renders the products returned by the API", () => {
    mockUseProducts({ data: sampleProducts, isLoading: false, error: null });
    render(<Products />);

    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getByText("Cotton T-shirt")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reorder Now" })).toBeInTheDocument();
  });
});