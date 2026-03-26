"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter valid email";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

const handleLogin = async () => {
  if (!validate()) return;

  setLoading(true);

  // clear old errors
  setErrors({ email: "", password: "" });

  try {
    const res = await fetch(
      "https://diet-chart-9wl9.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 IMPORTANT for cookies
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      // show backend error under email field
      setErrors({
        email: data.message || "Invalid email or password",
        password: "",
      });
      setLoading(false);
      return;
    }

    // ✅ Success
    alert("Login successful ✅");

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Server error ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back Soi Organic 👋
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full p-3 mb-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errors.email
              ? "border-red-500 focus:ring-red-400"
              : "focus:ring-green-400"
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <div className="relative mb-2">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full p-3 border rounded-lg pr-10 focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-green-400"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />

          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={!email || !password || loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup */}
        <p className="text-[14px] text-center mt-3 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-red-500 underline font-medium">
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;