import { LuBox } from "react-icons/lu";
import { LiaDollarSignSolid } from "react-icons/lia";
import { IoAlertSharp } from "react-icons/io5";
import { SiSimpleanalytics } from "react-icons/si";
import { CiCalendar } from "react-icons/ci";

export type SubItem = {
  label: string;
  value: number;
  type: "success" | "warning" | "danger";
};

export type StatItem = {
  id: number;
  title: string;
  value: string | number;
  subText?: string;
  icon: React.ElementType;
  iconColor: string;
  subItems?: SubItem[];
};

export const dashboardStats: StatItem[] = [
  {
    id: 1,
    title: "Total Products",
    value: 8,
    icon: LuBox,
    iconColor: "text-[#4F46E5]",
    subItems: [
      { label: "healthy", value: 4, type: "success" },
      { label: "low", value: 2, type: "warning" },
      { label: "critical", value: 2, type: "danger" },
    ],
  },
  {
    id: 2,
    title: "Stock Value",
    value: "$20,527.55",
    subText: "Total inventory value",
    icon: LiaDollarSignSolid,
    iconColor: "text-[#22C55E]",
  },
  {
    id: 3,
    title: "Active Alerts",
    value: 8,
    subText: "Requiring attentions",
    icon: IoAlertSharp,
    iconColor: "text-[#EF4444]",
  },
  {
    id: 4,
    title: "Avg. Sales Velocity",
    value: 8.4,
    subText: "Unit Per Week",
    icon: SiSimpleanalytics,
    iconColor: "text-black",
  },
];

export const ordersStats: StatItem[] = [
  {
    id: 1,
    title: "Total Orders",
    value: 3,
    subText: "All time",
    icon: LuBox,
    iconColor: "text-[#4F46E5]",
  },
  {
    id: 2,
    title: "Pending Orders",
    value: 2,
    subText: "Awaiting delivery",
    icon: CiCalendar,
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Total Value",
    value: 3,
    subText: "All time",
    icon: LiaDollarSignSolid,
    iconColor: "text-[#22C55E]",
  },
];

export const inventoryStats: StatItem[] = [
  {
    id: 1,
    title: "Total Inventory Value",
    value: "$20,527.42",
    subText: "+12.5% from last month",
    icon: LiaDollarSignSolid,
    iconColor: "text-[#22C55E]",
  },
  {
    id: 2,
    title: "Avg Stock Level",
    value: "39.3%",
    subText: "-3.2% from last month",
    icon: LuBox,
    iconColor: "text-[#4F46E5]",
  },
  {
    id: 3,
    title: "Total SKUs",
    value: 8,
    subText: "Active products",
    icon: LuBox,
    iconColor: "text-[#4F46E5]",
  },
  {
    id: 4,
    title: "Stock Alerts",
    value: 8,
    subText: "Require attention",
    icon: SiSimpleanalytics,
    iconColor: "text-black",
  },
];
