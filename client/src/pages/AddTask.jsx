import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/pokemon-bg.jpg";

function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "NORMAL",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to add task");
      navigate("/dashboard");
    } catch (error) {
      alert("Error creating mission");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* dark overlay */}
      <div className="min-h-screen bg-black/70">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="relative pokedex-card p-10 border-4 border-black bg-gray-100/95 shadow-2xl rounded-3xl">
            
            {/* Pokédex lights */}
            <div className="absolute -top-6 left-6 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-black shadow-inner animate-pulse" />
              <div className="w-6 h-6 rounded-full bg-red-500 border-2 border-black" />
              <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-black" />
              <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-black" />
            </div>

            <h2 className="text-4xl font-black text-red-600 mb-2 drop-shadow">
              New Trainer Mission
            </h2>
            <p className="text-gray-700 text-lg mb-8 font-semibold">
              Register a new task in your Pokédex
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="title"
                placeholder="Mission Title"
                value={formData.title}
                onChange={handleChange}
                className="pokemon-input border-2 border-black focus:ring-4 focus:ring-red-400"
                required
              />

              <textarea
                name="description"
                placeholder="Mission Description"
                value={formData.description}
                onChange={handleChange}
                className="pokemon-input min-h-[130px] resize-none border-2 border-black focus:ring-4 focus:ring-yellow-400"
                required
              />

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="pokemon-input border-2 border-black focus:ring-4 focus:ring-blue-400"
                required
              />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="pokemon-input cursor-pointer border-2 border-black focus:ring-4 focus:ring-green-400"
                required
              >
                <option value="NORMAL">🟢 Normal Mission</option>
                <option value="GYM">🔵 Gym Mission</option>
                <option value="ELITE">🔴 Elite Mission</option>
              </select>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 pokemon-btn-red text-lg tracking-wide hover:scale-105 transition"
                >
                  Save Mission
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 bg-black text-white font-extrabold rounded-xl py-3 border-2 border-black hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* bottom Pokédex glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
