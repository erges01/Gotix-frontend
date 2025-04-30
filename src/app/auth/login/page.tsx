"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import AuthNavbar from "@/components/AuthNavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!form.email || !form.password) {
      toast.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/auth/login", form);

      const token = response.data?.token;
      const user = response.data?.data?.user;

      if (!token) throw new Error("Login failed: No token received.");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#6B6B6B]">
      <AuthNavbar />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="flex items-center justify-center mt-20">
        <div className="max-w-md w-full p-8 border border-[#DDB892] rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-[#DDB892]">Welcome Back</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DDB892] focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DDB892] focus:outline-none pr-12"
                  required
                />
                <span
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#DDB892] hover:bg-[#caa374] text-[#1E1E1E] rounded-lg font-bold transition flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="mt-8 text-center">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-[#DDB892] hover:underline">
              Sign Up Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
