import { Routes, Route } from "react-router-dom";
import LogIn from "../../pages/login/LogIn";
import DashBoard from "../../pages/dashboard/DashBoard";
import Layout from "../layout/Layout";
import Products from "../../pages/products/Products";
import Alerts from "../../pages/alerts/Alerts";
import Reorder from "../../pages/reorder/Reorder";
import Suppliers from "../../pages/suppliers/Suppliers";
import Orders from "../../pages/orders/Orders";
import Analytics from "../../pages/analytics/Analytics";
import Settings from "../../pages/settings/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />

      <Route element={<Layout />}>
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="products" element={<Products />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reorder" element={<Reorder />} />
        <Route path="suppliers" element={<Suppliers />} />
        <Route path="orders" element={<Orders />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
