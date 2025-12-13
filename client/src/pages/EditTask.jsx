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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
      }}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="pokedex-card p-8">
          <h2 className="text-4xl font-black text-blue-500 mb-6">
            Edit Mission
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="pokemon-input"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="pokemon-input"
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
              className="pokemon-input"
            >
              <option value="NORMAL">Normal</option>
              <option value="GYM">Gym Mission</option>
              <option value="ELITE">Elite Mission</option>
            </select>

            <button type="submit" className="pokemon-btn-blue w-full">
              Update Mission
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="pokemon-btn bg-red-700 hover:bg-red-800 w-full"
            >
              Delete Mission
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
