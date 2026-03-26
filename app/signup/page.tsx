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

  const [loading, setLoading] = useState(false);

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

    // if (!form.confirmPassword) {
    //   newErrors.confirmPassword = "Confirm your password";
    //   valid = false;
    // } else if (form.password !== form.confirmPassword) {
    //   newErrors.confirmPassword = "Passwords not match";
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  // ✅ API CALL
  const handleSignup = async () => {
    if (!validate()) return;

    setLoading(true);

    // Clear old errors
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    try {
      const res = await fetch(
        "https://diet-chart-9wl9.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // Handle backend errors
        if (data.message === "User already exists") {
          setErrors((prev) => ({
            ...prev,
            email: "Email already registered",
          }));
        } else if (data.message === "Passwords do not match ❌") {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: data.message,
          }));
        } else {
          alert(data.message);
        }
        setLoading(false);
        return;
      }

      // ✅ Success
      localStorage.setItem("token", data.token);

      alert("Signup successful ✅");

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account 🚀
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-1 border rounded-lg"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
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
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
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
            className="absolute right-3 top-3 cursor-pointer"
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
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
          />
          <div
            className="absolute right-3 top-3 cursor-pointer"
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
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Sign Up"}
        </motion.button>

        {/* Login Redirect */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-red-600 underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;