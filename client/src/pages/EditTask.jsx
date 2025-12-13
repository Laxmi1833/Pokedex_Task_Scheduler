import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import bgImage from "../assets/pokemon-bg.jpg";

function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "NORMAL",
  });

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tasks = await res.json();
      const task = tasks.find((t) => t.id === id);

      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          deadline: task.deadline.split("T")[0],
          priority: task.priority,
        });
      }
    };

    fetchTask();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this mission?")) return;

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/dashboard");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* dark overlay */}
      <div className="min-h-screen bg-black/60">
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="pokedex-card border-4 border-black bg-gray-200/95 p-8 rounded-2xl shadow-2xl">
            {/* Pokédex lights */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-blue-900 animate-pulse" />
              <div className="w-4 h-4 bg-red-500 rounded-full" />
              <div className="w-4 h-4 bg-yellow-400 rounded-full" />
              <div className="w-4 h-4 bg-green-400 rounded-full" />
            </div>

            <h2 className="text-4xl font-black text-blue-700 mb-2">
              Edit Trainer Mission
            </h2>
            <p className="text-gray-700 font-semibold mb-8">
              Update your Pokédex mission details
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Mission Title"
                className="pokemon-input"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Mission Description"
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
              >
                <option value="NORMAL">Normal Mission</option>
                <option value="GYM">Gym Mission</option>
                <option value="ELITE">Elite Mission</option>
              </select>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  className="pokemon-btn-blue w-full text-lg"
                >
                  Update Mission
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="pokemon-btn bg-red-700 hover:bg-red-800 w-full text-lg"
                >
                  Delete Mission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
