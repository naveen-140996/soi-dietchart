"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  // 🔥 FETCH DATA
  useEffect(() => {
    fetch("https://diet-chart-9wl9.onrender.com/api/diet", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.diet) {
          setHistory(data.diet.entries || []);
          setTargetWeight(data.diet.targetWeight || "");
          setCurrentDay((data.diet.entries?.length || 0) + 1);
        }
      });
  }, []);

  // 🔥 SAVE
  const handleSave = async () => {
    if (!form.morning || !form.lunch || !form.dinner || !form.weight) return;

    setLoading(true);

    const res = await fetch(
      "https://diet-chart-9wl9.onrender.com/api/diet/save",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          weight: Number(form.weight),
          targetWeight: Number(targetWeight),
        }),
      }
    );

    const data = await res.json();

    if (data?.diet) {
      setHistory(data.diet.entries);
      setCurrentDay(data.diet.entries.length + 1);
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
  };

  // 📊 PROGRESS
  const start = history[0]?.weight;
  const current = history[history.length - 1]?.weight;

  let progress = 0;
  if (start && current && targetWeight) {
    const total = start - Number(targetWeight);
    const done = start - current;
    progress = Math.min((done / total) * 100, 100);
  }

  return (
    <>
    <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 p-3 md:p-8">
      
      {/* HEADER */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        🏋️ Diet Tracker
      </h1>

      {/* GOAL */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">🎯 Target Weight</h2>

        <input
          type="number"
          placeholder="Enter target weight"
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
            <p className="text-sm mt-2">{progress.toFixed(0)}% completed</p>
          </>
        )}
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-xl shadow mb-6"
      >
        <h2 className="text-lg font-semibold mb-4">
          Day {currentDay}
        </h2>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            placeholder="Morning meal"
            value={form.morning}
            onChange={(e) =>
              setForm({ ...form, morning: e.target.value })
            }
            className="p-2 border rounded-lg"
          />

          <input
            placeholder="Lunch meal"
            value={form.lunch}
            onChange={(e) =>
              setForm({ ...form, lunch: e.target.value })
            }
            className="p-2 border rounded-lg"
          />

          <input
            placeholder="Dinner meal"
            value={form.dinner}
            onChange={(e) =>
              setForm({ ...form, dinner: e.target.value })
            }
            className="p-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Weight"
            value={form.weight}
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Save Day"}
        </button>
      </motion.div>

      {/* HISTORY */}
      <div>
        <h2 className="text-lg font-semibold mb-3">📅 History</h2>

        {/* MOBILE SCROLL */}
        <div className="flex gap-3 overflow-x-auto md:hidden">
          {history.map((item, index) => (
            <div
              key={index}
              className="min-w-[80%] bg-white p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold mb-2">
                Day {item.day}
              </h3>
              <p>🌅 {item.morning}</p>
              <p>🍛 {item.lunch}</p>
              <p>🌙 {item.dinner}</p>
              <p className="mt-2 font-medium">
                ⚖️ {item.weight} kg
              </p>

              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 mt-2 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">
                Day {item.day}
              </h3>
              <p>🌅 {item.morning}</p>
              <p>🍛 {item.lunch}</p>
              <p>🌙 {item.dinner}</p>
              <p className="mt-2 font-medium">
                ⚖️ {item.weight} kg
              </p>

              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 mt-2 text-sm"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
   
  );
};

export default DietPage;