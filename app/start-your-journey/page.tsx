"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { fetchWithAuth } from "../utils/api";

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

  const [form, setForm] = useState({
    morning: "",
    lunch: "",
    dinner: "",
    weight: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🔐 Protect page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
    }
  }, []);

  // 🔥 FETCH
  useEffect(() => {
    const load = async () => {
      const res = await fetchWithAuth(
        "https://diet-chart-9wl9.onrender.com/api/diet"
      );
      const data = await res.json();

      if (data?.diet) {
        const entries = data.diet.entries || [];
        setHistory(entries);
        setTargetWeight(data.diet.targetWeight || "");
        setCurrentDay(entries.length === 0 ? 1 : entries.length + 1);
      }
    };

    load();
  }, []);

  // 🔥 SAVE
  const handleSave = async () => {
    const res = await fetchWithAuth(
      "https://diet-chart-9wl9.onrender.com/api/diet/save",
      {
        method: "POST",
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
      setCurrentDay(updated.length + 1);
      setForm({ morning: "", lunch: "", dinner: "", weight: "" });
    }
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

    const res = await fetchWithAuth(
      "https://diet-chart-9wl9.onrender.com/api/diet/update",
      {
        method: "PUT",
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
      setCurrentDay(updated.length + 1);
      setShowModal(false); // ✅ CLOSE POPUP
    }
  };

  // 🔥 DELETE
  const handleDelete = async (index: number) => {
    const res = await fetchWithAuth(
      "https://diet-chart-9wl9.onrender.com/api/diet/delete",
      {
        method: "DELETE",
        body: JSON.stringify({ index }),
      }
    );

    const data = await res.json();

    if (data?.diet) {
      const updated = data.diet.entries;
      setHistory(updated);

      // ✅ FIX DAY RESET
      setCurrentDay(updated.length === 0 ? 1 : updated.length + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Diet Tracker</h1>

      {/* FORM */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2>Day {currentDay}</h2>

        <input
          placeholder="Morning"
          onChange={(e) =>
            setForm({ ...form, morning: e.target.value })
          }
          className="block mb-2 p-2 border w-full"
        />
        <input
          placeholder="Lunch"
          onChange={(e) =>
            setForm({ ...form, lunch: e.target.value })
          }
          className="block mb-2 p-2 border w-full"
        />
        <input
          placeholder="Dinner"
          onChange={(e) =>
            setForm({ ...form, dinner: e.target.value })
          }
          className="block mb-2 p-2 border w-full"
        />
        <input
          placeholder="Weight"
          type="number"
          onChange={(e) =>
            setForm({ ...form, weight: e.target.value })
          }
          className="block mb-2 p-2 border w-full"
        />

        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2"
        >
          Save
        </button>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-4">
        {history.map((item, index) => (
          <div key={index} className="p-4 bg-white shadow rounded">
            <div className="flex justify-between">
              <h3>Day {item.day}</h3>

              <div className="flex gap-2">
                <Pencil onClick={() => handleEdit(index)} />
                <Trash2 onClick={() => handleDelete(index)} />
              </div>
            </div>

            <p>{item.morning}</p>
            <p>{item.lunch}</p>
            <p>{item.dinner}</p>
            <p>{item.weight} kg</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-4 rounded w-80">
            <input
              value={form.morning}
              onChange={(e) =>
                setForm({ ...form, morning: e.target.value })
              }
              className="mb-2 p-2 border w-full"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white w-full py-2"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DietPage;