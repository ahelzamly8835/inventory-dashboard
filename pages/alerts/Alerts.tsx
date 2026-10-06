import { GrCircleAlert } from "react-icons/gr";
type AlertStatus = "critical" | "low";

type ActionItem = {
  label: string;
  type: "primary" | "secondary" | "danger";
};

type AlertItem = {
  id: number;
  title: string;
  time: string;
  status: AlertStatus;
  message: string;
  actions: ActionItem[];
  read?: boolean;
};

const alertsData: AlertItem[] = [
  {
    id: 1,
    title: "Organic Cotton T-shirt",
    time: "35d ago",
    status: "critical",
    message: "Critical Stock level! Only 12 units remaining.",
    actions: [
      { label: "Reorder Now", type: "primary" },
      { label: "Reorder", type: "secondary" },
      { label: "Mark as read", type: "danger" },
    ],
  },
  {
    id: 2,
    title: "Organic Cotton T-shirt",
    time: "35d ago",
    status: "low",
    message: "Critical Stock level! Only 12 units remaining.",
    actions: [
      { label: "Reorder Now", type: "primary" },
      { label: "Reorder", type: "secondary" },
      { label: "Mark as read", type: "danger" },
    ],
  },
  {
    id: 3,
    title: "Organic Cotton T-shirt",
    time: "35d ago",
    status: "critical",
    message: "Critical Stock level! Only 12 units remaining.",
    actions: [
      { label: "Reorder Now", type: "primary" },
      { label: "Reorder", type: "secondary" },
      { label: "Mark as read", type: "danger" },
    ],
  },
  {
    id: 4,
    title: "Organic Cotton T-shirt",
    time: "35d ago",
    status: "critical",
    message: "Critical Stock level! Only 12 units remaining.",
    actions: [
      { label: "Reorder Now", type: "primary" },
      { label: "Reorder", type: "secondary" },
      { label: "Mark as read", type: "danger" },
    ],
    read: true,
  },
];

const btnStyles = {
  primary:
    "bg-[#4F46E5] text-white px-3 py-1 rounded hover:opacity-90 transition",
  secondary:
    "bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-300 transition",
  danger: "text-black font-semibold",
};

const Alerts = () => {
  return (
    <div className="md:mx-10 mt-8">
      <div className="mx-4 md:mx-0 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Stock Alerts</h1>
        <button className="border border-[#E5E7EB] p-3 rounded-xl cursor-pointer font-semibold">Mark All as Read</button>
      </div>
      <p className="text-[#64748B] mt-4 mb-6 mx-4 md:mx-0">3 unread alerts</p>
      <div className="flex flex-col gap-6">
        {alertsData.map((item) => (
          <div
            key={item.id}
            className={`py-6 px-10 rounded-xl shadow transition flex flex-col gap-3 ${item.read
                ? "bg-gray-100 opacity-60 pointer-events-none"
                : "bg-white hover:shadow-md"
              }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GrCircleAlert className="text-[#EF4444] text-xl" />
                <h2 className="font-medium">
                  {item.title}</h2>
              </div>
              <p className="text-xs text-gray-400">{item.time}</p>
            </div>

            <span
              className={`text-xs ml-6 px-2 py-1 rounded-full w-fit ${item.status === "critical"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
                }`}
            >
              {item.status === "critical" ? "Critical Stock" : "Low Stock"}
            </span>

            <p className="text-sm ml-6 text-gray-500">{item.message}</p>

            <div className="flex gap-3 ml-6 flex-wrap">
              {item.actions.map((action, i) => (
                <button
                  key={i}
                  className={`text-sm rounded-xl cursor-pointer ${btnStyles[action.type]}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
