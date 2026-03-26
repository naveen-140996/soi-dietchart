"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type UserType = {
  id: string;
  name?: string;
  email?: string;
};

const ProfilePage = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ✅ Fetch user profile
  useEffect(() => {
    fetch("https://diet-chart-9wl9.onrender.com/api/user/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router]);

  // ✅ Logout
  const handleLogout = async () => {
    await fetch("https://diet-chart-9wl9.onrender.com/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            My Profile 👤
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          
          {/* Left Side */}
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold mb-4">
              {user?.name?.charAt(0) || "U"}
            </div>

            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <div className="p-3 border rounded-lg bg-gray-50">
                {user?.name}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <div className="p-3 border rounded-lg bg-gray-50">
                {user?.email}
              </div>
            </div>

            {/* <div>
              <label className="text-sm text-gray-500">User ID</label>
              <div className="p-3 border rounded-lg bg-gray-50 break-all">
                {user?.id}
              </div>
            </div> */}

          </div>
        </motion.div>

        {/* Extra Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 bg-white rounded-xl p-6 shadow"
        >
          <h3 className="font-semibold text-lg mb-2">
            Account Info
          </h3>

          <p className="text-gray-600 text-sm">
            Manage your profile and track your diet progress here.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;