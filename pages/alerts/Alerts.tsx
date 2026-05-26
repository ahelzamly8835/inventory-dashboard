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
    <div className="flex flex-col gap-6">
      <div className="pt-10 pl-10 ">
        <h1 className="text-xl font-semibold">Stock Alerts</h1>
        <p className="text-[#64748B] my-4">3 unread alerts</p>
      </div>

      <div className="flex flex-col gap-4">
        {alertsData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-xs text-gray-400">{item.time}</p>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full w-fit ${
                item.status === "critical"
                  ? "bg-red-100 text-red-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {item.status === "critical" ? "Critical Stock" : "Low Stock"}
            </span>

            <p className="text-sm text-gray-500">{item.message}</p>

            <div className="flex gap-3 flex-wrap">
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
