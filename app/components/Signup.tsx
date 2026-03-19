"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
    const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ Validation
  const validate = () => {
    let valid = true;
    let newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!form.name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter valid email";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
      valid = false;
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      valid = false;
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSignup = () => {
    if (validate()) {
      console.log("User Registered:", form);
      router.push("/dashboard");
    }
  };
  
  return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
          Create Account 🚀
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-1 border rounded-lg"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mb-2">{errors.name}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-1 border rounded-lg"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* Password */}
        <div className="relative mb-1">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 border rounded-lg pr-10"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <div className="relative mb-1">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm Password"
            className="w-full p-3 border rounded-lg pr-10"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mb-3">
            {errors.confirmPassword}
          </p>
        )}

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          Sign Up
        </motion.button>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/")}
            className="text-blue-600 font-medium cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  )
}

export default Signup