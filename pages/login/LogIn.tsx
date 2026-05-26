import { Link } from "react-router-dom";
import Logo from "../../assets/imges/d4587bcb3ac2505b6868b8668bc34ded6ea83be5.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogin = () => {
    toast.success("Logged in successfully");

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  };
  return (
    <div className="flex items-center justify-center h-screen overflow-x-hidden overscroll-none">
      <div className="bg-white w-[400px] h-[650px] rounded-lg">
        <div className="">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-semibold text-2xl">Welcome To ReStock</h1>
          <p className="font-semibold text-lg text-[#64748B]">
            Manage tour inventory with confidence
          </p>
        </div>
        <div className="w-full px-6 mt-6">
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="Omar@example.com"
            className="w-full px-4 py-3 rounded-xl focus:bg-white border border-[#E5E7EB] outline-none"
          />
          <label className="block  text-sm text-gray-700 mt-4 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full px-4 py-3 rounded-xl border focus:bg-white border-[#E5E7EB] outline-none"
          />
          <div className="btn flex justify-center items-center mt-5">
            <Link to="/dashboard">
              <button
                onClick={handleLogin}
                className="bg-[#4F46E5] text-white rounded-xl w-[350px] px-10 py-4 cursor-pointer 
            hover:bg-[#3731a7] duration-150 ease-in-out"
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
