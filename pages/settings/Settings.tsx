import { useState } from "react";

type SettingItem = {
  id: number;
  title: string;
  description: string;
  enabled: boolean;
};

export default function Settings() {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 1,
      title: "Email Notifications",
      description: "Receive updates via email",
      enabled: true,
    },
    {
      id: 2,
      title: "Dark Mode",
      description: "Enable dark theme for dashboard",
      enabled: false,
    },
    {
      id: 3,
      title: "Auto Backup",
      description: "Automatically backup your data",
      enabled: true,
    },
    {
      id: 4,
      title: "Two Factor Auth",
      description: "Add extra security layer",
      enabled: false,
    },
  ]);

  const toggleSetting = (id: number) => {
    setSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item,
      ),
    );
  };

  return (
    <div className="p-6 bg-gray-100  rounded-xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your application preferences</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 space-y-4">
        {settings.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4 last:border-none"
          >
            <div>
              <h2 className="font-semibold text-lg">{item.title}</h2>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>

            <button
              onClick={() => toggleSetting(item.id)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                item.enabled ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 cursor-pointer rounded-full shadow-md transform transition ${
                  item.enabled ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
