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
      <div className="min-h-screen bg-black/60">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="pokedex-card p-8">
            <h2 className="text-4xl font-black text-red-600 mb-2">
              New Trainer Mission
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Register a new task in your Pokédex
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="title"
                placeholder="Mission Title"
                value={formData.title}
                onChange={handleChange}
                className="pokemon-input"
                required
              />

              <textarea
                name="description"
                placeholder="Mission Description"
                value={formData.description}
                onChange={handleChange}
                className="pokemon-input min-h-[120px] resize-none"
                required
              />

              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="pokemon-input"
                required
              />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="pokemon-input cursor-pointer"
                required
              >
                <option value="NORMAL">Normal</option>
                <option value="GYM">Gym Mission</option>
                <option value="ELITE">Elite Mission</option>
              </select>

              <div className="flex gap-4">
                <button type="submit" className="flex-1 pokemon-btn-red">
                  Save Mission
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 pokemon-btn bg-gray-700 hover:bg-gray-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
