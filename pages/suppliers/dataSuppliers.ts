type SupplierAction = {
  label: string;
  type: "primary" | "secondary";
};

type SupplierItem = {
  id: number;
  name: string;
  rating: string;
  email: string;
  phone: string;
  leadTime: string;
  products: string;
  actions: SupplierAction[];
};
export const suppliersData: SupplierItem[] = [
  {
    id: 1,
    name: "Techsource Electronics",
    rating: "4.5 / 5.0",
    email: "omarhani@example.com",
    phone: "+20 1012345678",
    leadTime: "14 days lead time",
    products: "45 product supplied",
    actions: [
      { label: "Contact", type: "secondary" },
      { label: "Reorder Now", type: "primary" },
    ],
  },

  {
    id: 2,
    name: "Alpha Trading Co",
    rating: "4.2 / 5.0",
    email: "ahmedkhaled@example.com",
    phone: "+20 102334455646",
    leadTime: "10 days lead time",
    products: "30 product supplied",
    actions: [
      { label: "Contact", type: "secondary" },
      { label: "Reorder Now", type: "primary" },
    ],
  },

  {
    id: 3,
    name: "Global Supply Hub",
    rating: "4.8 / 5.0",
    email: "youssefkhaled@example.com",
    phone: "+20 109887766588",
    leadTime: "20 days lead time",
    products: "60 product supplied",
    actions: [
      { label: "Contact", type: "secondary" },
      { label: "Reorder Now", type: "primary" },
    ],
  },
];
