export type StockStatus = "low" | "critical";

export type LowStockItem = {
  id: number;
  name: string;
  status: StockStatus;
  current: number;
  min: number;
};

export const lowStockAlerts: LowStockItem[] = [
  {
    id: 1,
    name: "Organic Cotton T-shirt",
    status: "critical",
    current: 12,
    min: 30,
  },
  {
    id: 2,
    name: "Stainless Steel Water Bottle",
    status: "low",
    current: 12,
    min: 30,
  },
  {
    id: 3,
    name: "LED Desk Lamp",
    status: "critical",
    current: 12,
    min: 30,
  },
  {
    id: 4,
    name: "Running Shoes Elite",
    status: "low",
    current: 12,
    min: 30,
  },
];
