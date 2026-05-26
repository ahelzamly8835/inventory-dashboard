import AppRoutes from "./routes/AppRoutes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
function App() {
  return (
    <div className="bg-[#EEF2FF] min-h-screen">
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        theme="light"
      />
    </div>
  );
}

export default App;
