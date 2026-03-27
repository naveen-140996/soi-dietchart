"use client";

import { useEffect, useState } from "react";
import API from "../utils/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface DayEntry {
  day: number;
  morning: string;
  lunch: string;
  dinner: string;
  weight: string;
}

export default function StartYourJourney() {
  const [entries, setEntries] = useState<DayEntry[]>([]);
  const [targetWeight, setTargetWeight] = useState<number | null>(null);

  const [errors, setErrors] = useState<any>({});

  const [fetchLoading, setFetchLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  const [form, setForm] = useState({
    morning: "",
    lunch: "",
    dinner: "",
    weight: "",
    targetWeight: "",
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔥 FETCH
  const fetchDiet = async () => {
    setFetchLoading(true);
    try {
      const res = await API.get("/diet");

      if (res.data?.diet) {
        setEntries(res.data.diet.entries || []);
        setTargetWeight(res.data.diet.targetWeight || null);
      }
    } catch {
      toast.error("Failed to load data");
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    fetchDiet();
  }, []);

  // 🔥 PROGRESS
  const startWeight = Number(entries[0]?.weight || 0);
  const currentWeight = Number(entries[entries.length - 1]?.weight || 0);
  const target = Number(targetWeight || 0);

  const progress =
    target && startWeight
      ? ((startWeight - currentWeight) / (startWeight - target)) * 100
      : 0;

  const isAchieved = currentWeight <= target;

  // 🔥 INPUT
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors: any = {};

    if (!form.morning) newErrors.morning = "Morning required";
    if (!form.lunch) newErrors.lunch = "Lunch required";
    if (!form.dinner) newErrors.dinner = "Dinner required";
    if (!form.weight) newErrors.weight = "Weight required";

    if (!targetWeight && !form.targetWeight) {
      newErrors.targetWeight = "Target required first time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔥 SAVE
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSaveLoading(true);

      await API.post("/diet/save", form);

      toast.success("Saved successfully ✅");

      setForm({
        morning: "",
        lunch: "",
        dinner: "",
        weight: "",
        targetWeight: "",
      });
      setErrors({}); // 🔥 clear errors

      await fetchDiet(); // ensure fresh data

    } catch {
      toast.error("Save failed ❌");
    }

    setSaveLoading(false);
  };

  // 🔥 EDIT
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

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (!validate()) return;

    try {
      setUpdateLoading(true);

      await API.put("/diet/update", {
        index: editIndex,
        updatedData: form,
      });

      toast.success("Updated successfully ✨");

      setIsModalOpen(false);
       setForm({
        morning: "",
        lunch: "",
        dinner: "",
        weight: "",
        targetWeight: "",
      });
     await fetchDiet();
    } catch {
      toast.error("Update failed ❌");
    }

    setUpdateLoading(false);
  };

  // 🔥 DELETE
  const handleDelete = async (index: number) => {
    try {
      setDeleteLoading(index);

      await API.delete("/diet/delete", {
        data: { index },
      });

      toast.success("Deleted 🗑️");
      fetchDiet();
    } catch {
      toast.error("Delete failed ❌");
    }

    setDeleteLoading(null);
  };

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto p-4">

        {/* SKELETON */}
        {fetchLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 animate-pulse rounded" />
            ))}
          </div>
        ) : (
          <>
            {/* PROGRESS */}
           {targetWeight && (
  <div className="bg-white p-5 rounded-xl shadow mb-6">
    <h2 className="font-bold mb-4 text-lg">Weight Progress 📊</h2>

    {/* TOP INFO */}
    <div className="grid grid-cols-3 text-center mb-4">
      <div>
        <p className="text-sm text-gray-500">Start</p>
        <p className="font-bold">{startWeight} kg</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Current</p>
        <p className="font-bold text-blue-600">{currentWeight} kg</p>
      </div>

      <div>
        <p className="text-sm text-gray-500">Target</p>
        <p className="font-bold text-green-600">{targetWeight} kg</p>
      </div>
    </div>

    {/* PROGRESS BAR */}
    <div className="relative w-full bg-gray-200 h-4 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full"
      />

      {/* CURRENT WEIGHT MARKER */}
      <div
        className="absolute top-[-8px] text-xs font-bold text-blue-600"
        style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
      >
        ⬇
      </div>
    </div>

    {/* PROGRESS TEXT */}
    <div className="flex justify-between text-xs mt-2 text-gray-500">
      <span>{startWeight}kg</span>
      <span>{targetWeight}kg</span>
    </div>

    <p className="mt-2 text-sm text-center">
      {progress.toFixed(1)}% Completed
    </p>

    {isAchieved && (
      <p className="text-green-600 font-bold text-center mt-2">
        🎉 Target Achieved Successfully!
      </p>
    )}
  </div>
)}

            {/* FORM */}
            <div className="bg-white p-5 rounded-xl shadow grid md:grid-cols-2 gap-4">
              {["morning","lunch","dinner","weight","targetWeight"].map((field) => (
                <div key={field}>
                  <input
                    name={field}
                    value={(form as any)[field]}
                    onChange={handleChange}
                    placeholder={field}
                    className={`w-full p-3 border rounded-lg ${
                      errors[field] ? "border-red-500" : ""
                    }`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={saveLoading}
                className="col-span-full bg-green-600 text-white py-3 rounded-lg"
              >
                {saveLoading ? "Saving..." : "Save Day"}
              </button>
            </div>

            {/* HORIZONTAL CARDS */}
            <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
              {entries.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="min-w-[250px] bg-white p-4 rounded-xl shadow"
                >
                  <h2>Day {item.day}</h2>
                  <p>{item.morning}</p>
                  <p>{item.lunch}</p>
                  <p>{item.dinner}</p>
                  <p>{item.weight} kg</p>

                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>

                    <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                      {deleteLoading === index ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
     {isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="bg-white p-5 rounded-xl w-[90%] max-w-md shadow-lg"
    >
      <h2 className="text-lg font-bold mb-3">Edit Day</h2>

      {/* INPUTS */}
      {["morning", "lunch", "dinner", "weight"].map((field) => (
        <div key={field} className="mb-2">
          <input
            name={field}
            value={(form as any)[field]}
            onChange={handleChange}
            placeholder={field}
            className={`w-full border p-2 rounded ${
              errors[field] ? "border-red-500" : ""
            }`}
          />
          {errors[field] && (
            <p className="text-red-500 text-xs">{errors[field]}</p>
          )}
        </div>
      ))}

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2 mt-4">
        
        {/* 🔴 CANCEL BUTTON */}
        <button
          onClick={() => {
            setIsModalOpen(false);
            setEditIndex(null);

            // optional reset
            setErrors({});
            setForm({
              morning: "",
              lunch: "",
              dinner: "",
              weight: "",
              targetWeight: "",
            });
          }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        {/* UPDATE BUTTON */}
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          {updateLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </motion.div>
  </div>
)}
      <Footer />
    </div>
  );
}