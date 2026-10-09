import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/imges/d4587bcb3ac2505b6868b8668bc34ded6ea83be5.png";
import { toast } from "react-toastify";
import { supabase } from "../../src/lib/supabase";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully");
    navigate("/dashboard");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="test@example.com"
            className="w-full px-4 py-3 rounded-xl focus:bg-white border border-[#E5E7EB] outline-none"
          />
          <label className="block  text-sm text-gray-700 mt-4 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="w-full px-4 py-3 rounded-xl border focus:bg-white border-[#E5E7EB] outline-none"
          />
          <div className="btn flex justify-center items-center mt-5">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="bg-[#4F46E5] text-white rounded-xl w-[350px] px-10 py-4 cursor-pointer 
            hover:bg-[#3731a7] duration-150 ease-in-out disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}