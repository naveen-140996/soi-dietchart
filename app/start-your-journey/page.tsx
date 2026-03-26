"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DayEntry {
  day: number;
  morning: string;
  lunch: string;
  dinner: string;
  weight: number;
}

const DietPage = () => {
  const [mounted, setMounted] = useState(false);
  const [history, setHistory] = useState<DayEntry[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [targetWeight, setTargetWeight] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    morning: "",
    lunch: "",
    dinner: "",
    weight: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔥 FETCH
  useEffect(() => {
    setMounted(true);

    fetch("https://diet-chart-9wl9.onrender.com/api/diet", {
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.diet) {
          const entries = data.diet.entries || [];
          setHistory(entries);
          setTargetWeight(data.diet.targetWeight || "");
          setCurrentDay(entries.length + 1); // ✅ correct
        }
      });
  }, []);

  if (!mounted) return null;

  // 🔥 SAVE
  const handleSave = async () => {
    if (!form.morning || !form.lunch || !form.dinner || !form.weight) return;

    setLoading(true);

    const res = await fetch(
      "https://diet-chart-9wl9.onrender.com/api/diet/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          weight: Number(form.weight),
          targetWeight: Number(targetWeight),
        }),
      }
    );

    const data = await res.json();

    if (data?.diet) {
      const updated = data.diet.entries;
      setHistory(updated);
      setCurrentDay(updated.length + 1); // ✅ FIX
      setForm({ morning: "", lunch: "", dinner: "", weight: "" });
    }

    setLoading(false);
  };

  // 🔥 EDIT
  const handleEdit = (index: number) => {
    const item = history[index];

    setForm({
      morning: item.morning,
      lunch: item.lunch,
      dinner: item.dinner,
      weight: item.weight.toString(),
    });

    setEditIndex(index);
    setShowModal(true);
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (editIndex === null) return;

    const res = await fetch(
      "https://diet-chart-9wl9.onrender.com/api/diet/update",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index: editIndex,
          updatedData: {
            ...form,
            weight: Number(form.weight),
          },
        }),
      }
    );

    const data = await res.json();

    if (data?.diet) {
      const updated = data.diet.entries;
      setHistory(updated);
      setCurrentDay(updated.length + 1); // ✅ FIX
      setShowModal(false);
      setForm({ morning: "", lunch: "", dinner: "", weight: "" });
      setEditIndex(null);
    }
  };

  // 🔥 DELETE
  const handleDelete = async (index: number) => {
    const res = await fetch(
      "https://diet-chart-9wl9.onrender.com/api/diet/delete",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      }
    );

    const data = await res.json();

    if (data?.diet) {
      const updated = data.diet.entries;

      setHistory(updated);

      // ✅ IMPORTANT FIX
      if (updated.length === 0) {
        setCurrentDay(1);
      } else {
        setCurrentDay(updated.length + 1);
      }
    }
  };

  // 🔥 PROGRESS
  let progress = 0;
  if (history.length > 0 && targetWeight) {
    const start = history[0]?.weight;
    const current = history[history.length - 1]?.weight;

    if (start && current) {
      const total = start - Number(targetWeight);
      const done = start - current;
      progress = Math.min((done / total) * 100, 100);
    }
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">
          🏋️ Diet Tracker
        </h1>

        {/* TARGET */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-3">🎯 Target Weight</h2>

          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="p-2 border rounded-lg w-full mb-3"
          />

          {progress > 0 && (
            <>
              <div className="w-full bg-gray-200 h-3 rounded-full">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm mt-2">{progress.toFixed(0)}%</p>
            </>
          )}
        </div>

        {/* FORM */}
        <div className="bg-white p-5 rounded-xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">
            Day {currentDay}
          </h2>

          <div className="grid md:grid-cols-2 gap-3">
            <input
              placeholder="Morning"
              value={form.morning}
              onChange={(e) =>
                setForm({ ...form, morning: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="Lunch"
              value={form.lunch}
              onChange={(e) =>
                setForm({ ...form, lunch: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              placeholder="Dinner"
              value={form.dinner}
              onChange={(e) =>
                setForm({ ...form, dinner: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Weight"
              value={form.weight}
              onChange={(e) =>
                setForm({ ...form, weight: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>

          <button
            onClick={handleSave}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* HISTORY */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-4 rounded-xl shadow"
            >
              <div className="flex justify-between mb-2">
                <h3>Day {item.day}</h3>

                <div className="flex gap-2">
                  <Pencil
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(index)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>

              <p>{item.morning}</p>
              <p>{item.lunch}</p>
              <p>{item.dinner}</p>
              <p className="font-semibold">{item.weight} kg</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[90%] max-w-md">
            <input
              value={form.morning}
              onChange={(e) =>
                setForm({ ...form, morning: e.target.value })
              }
              className="w-full mb-2 p-2 border"
            />
            <input
              value={form.lunch}
              onChange={(e) =>
                setForm({ ...form, lunch: e.target.value })
              }
              className="w-full mb-2 p-2 border"
            />
            <input
              value={form.dinner}
              onChange={(e) =>
                setForm({ ...form, dinner: e.target.value })
              }
              className="w-full mb-2 p-2 border"
            />
            <input
              value={form.weight}
              onChange={(e) =>
                setForm({ ...form, weight: e.target.value })
              }
              className="w-full mb-4 p-2 border"
              type="number"
            />

            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white w-full py-2 mb-2"
            >
              Update
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-400 text-white w-full py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default DietPage;