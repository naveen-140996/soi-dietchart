"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DayEntry {
  day: number;
  morning: string;
  lunch: string;
  dinner: string;
  weight: string;
}

export default function Dashboard() {
  const [currentDay, setCurrentDay] = useState(1);
  const [history, setHistory] = useState<DayEntry[]>([]);
    const [targetWeight, setTargetWeight] = useState("");

  const [form, setForm] = useState({
    morning: "",
    lunch: "",
    dinner: "",
    weight: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("dietHistory");
    const goal = localStorage.getItem("targetWeight");

    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      setCurrentDay(parsed.length + 1);
    }

    if (goal) setTargetWeight(goal);
  }, []);


 // Save
  useEffect(() => {
    localStorage.setItem("dietHistory", JSON.stringify(history));
    if (targetWeight) {
      localStorage.setItem("targetWeight", targetWeight);
    }
  }, [history, targetWeight]);

  const handleSave = () => {
    if (!form.morning || !form.lunch || !form.dinner || !form.weight) return;

    const newEntry: DayEntry = {
      day: currentDay,
      ...form,
    };

    if (editIndex !== null) {
      const updated = [...history];
      updated[editIndex] = newEntry;
      setHistory(updated);
      setEditIndex(null);
    } else {
      setHistory([...history, newEntry]);
      setCurrentDay(currentDay + 1);
    }

    setForm({ morning: "", lunch: "", dinner: "", weight: "" });
  };

  // Edit
  const handleEdit = (index: number) => {
    const item = history[index];
    setForm(item);
    setEditIndex(index);
    setCurrentDay(item.day);
  };

  // Progress
  const startWeight = history.length ? Number(history[0].weight) : null;
  const currentWeight = history.length
    ? Number(history[history.length - 1].weight)
    : null;

  let progress = 0;
  if (startWeight && currentWeight && targetWeight) {
    const total = startWeight - Number(targetWeight);
    const done = startWeight - currentWeight;
    progress = Math.min((done / total) * 100, 100);
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 max-w-4xl mx-auto overflow-x-hidden">
      
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        🏋️ Weight Loss Challenge
      </h1>

       {/* Goal */}
        <div className="bg-white p-5 rounded-2xl shadow mb-6">
          <h2 className="font-semibold mb-3">🎯 Goal Tracking</h2>

          <input
            type="number"
            placeholder="Target weight"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="p-2 border rounded-lg w-full mb-3"
          />

          {startWeight && currentWeight && targetWeight && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="text-sm mt-2">
                {progress.toFixed(0)}% completed
              </p>
            </>
          )}
        </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-2xl shadow mb-6"
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
            placeholder="Weight (kg)"
            type="number"
            value={form.weight}
            onChange={(e) =>
              setForm({ ...form, weight: e.target.value })
            }
            className="p-2 border rounded-lg"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
        >
          {editIndex !== null ? "Update Day" : "Save Day"}
        </button>
      </motion.div>

      {/* History */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">📅 History</h2>

        {/* Mobile → Horizontal Scroll */}
        <div className="md:hidden overflow-hidden">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="min-w-[85%] max-w-[300px] snap-start bg-white p-4 rounded-xl shadow flex-shrink-0"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Day {item.day}</h3>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 text-sm"
                  >
                    Edit
                  </button>
                </div>

                <p className="text-sm">🌅 {item.morning}</p>
                <p className="text-sm">🍛 {item.lunch}</p>
                <p className="text-sm">🌙 {item.dinner}</p>
                <p className="text-sm font-medium mt-2">
                  ⚖️ {item.weight} kg
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop → Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Day {item.day}</h3>
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>
              </div>

              <p className="text-sm">🌅 {item.morning}</p>
              <p className="text-sm">🍛 {item.lunch}</p>
              <p className="text-sm">🌙 {item.dinner}</p>
              <p className="text-sm font-medium mt-2">
                ⚖️ {item.weight} kg
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
   
  );
}