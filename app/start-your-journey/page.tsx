"use client";

import { useEffect, useState } from "react";
import API from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DayEntry {
  day: number;
  morning: string;
  lunch: string;
  dinner: string;
  weight: string;
}

export default function StartYourJourney() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [form, setForm] = useState({
    morning: "",
    lunch: "",
    dinner: "",
    weight: "",
    targetWeight: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ FETCH
  const fetchDiet = async () => {
    try {
      const res = await API.get("/diet");
      if (res.data?.diet?.entries) {
        setEntries(res.data.diet.entries);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDiet();
  }, []);

  // ✅ INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SAVE (MAIN FORM)
  const handleSubmit = async () => {
    try {
      await API.post("/diet/save", form);

      setForm({
        morning: "",
        lunch: "",
        dinner: "",
        weight: "",
        targetWeight: "",
      });

      fetchDiet();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ OPEN EDIT MODAL
  const handleEdit = (index: number) => {
    const item = entries[index];

    setForm({
      morning: item.morning,
      lunch: item.lunch,
      dinner: item.dinner,
      weight: item.weight,
      targetWeight: "",
    });

    setEditIndex(index);
    setIsModalOpen(true);
  };

  // ✅ UPDATE FROM MODAL
  const handleUpdate = async () => {
    try {
      await API.put("/diet/update", {
        index: editIndex,
        updatedData: form,
      });

      setIsModalOpen(false);
      setEditIndex(null);

      fetchDiet();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const handleDelete = async (index: number) => {
    try {
      await API.delete("/diet/delete", {
        data: { index },
      });
      fetchDiet();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />

      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Start Your Journey 🚀
        </h1>

        {/* ADD FORM */}
        <div className="bg-white shadow p-4 rounded-lg space-y-3">
          <input
            name="morning"
            value={form.morning}
            onChange={handleChange}
            placeholder="Morning Diet"
            className="w-full border p-2 rounded"
          />
          <input
            name="lunch"
            value={form.lunch}
            onChange={handleChange}
            placeholder="Lunch"
            className="w-full border p-2 rounded"
          />
          <input
            name="dinner"
            value={form.dinner}
            onChange={handleChange}
            placeholder="Dinner"
            className="w-full border p-2 rounded"
          />
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            placeholder="Current Weight"
            className="w-full border p-2 rounded"
          />
          <input
            name="targetWeight"
            value={form.targetWeight}
            onChange={handleChange}
            placeholder="Target Weight"
            className="w-full border p-2 rounded"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Save Day
          </button>
        </div>

        {/* LIST */}
        <div className="mt-6 space-y-4">
          {entries.map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow bg-gray-50"
            >
              <h2 className="font-bold">Day {item.day}</h2>
              <p>🌅 Morning: {item.morning}</p>
              <p>🍛 Lunch: {item.lunch}</p>
              <p>🌙 Dinner: {item.dinner}</p>
              <p>⚖ Weight: {item.weight}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Day</h2>

            <div className="space-y-3">
              <input
                name="morning"
                value={form.morning}
                onChange={handleChange}
                placeholder="Morning"
                className="w-full border p-2 rounded"
              />
              <input
                name="lunch"
                value={form.lunch}
                onChange={handleChange}
                placeholder="Lunch"
                className="w-full border p-2 rounded"
              />
              <input
                name="dinner"
                value={form.dinner}
                onChange={handleChange}
                placeholder="Dinner"
                className="w-full border p-2 rounded"
              />
              <input
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}