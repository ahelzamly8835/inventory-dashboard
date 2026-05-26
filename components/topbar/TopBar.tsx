import type { StatItem } from "../../src/data/stats";

type Props = {
  data: StatItem[];
};

export default function TopBar({ data }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {data.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700">{item.title}</p>
              <div className={`p-2 rounded-lg ${item.iconColor} bg-gray-100`}>
                <Icon className="text-xl" />
              </div>
            </div>
            <h2 className="text-xl">{item.value}</h2>
            {item.subItems ? (
              <div className="flex justify-between">
                {item.subItems.map((sub, i) => (
                  <span
                    key={i}
                    className={
                      sub.type === "success"
                        ? "text-green-600"
                        : sub.type === "warning"
                          ? "text-yellow-500"
                          : "text-red-600"
                    }
                  >
                    {sub.value} {sub.label}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm">{item.subText}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
