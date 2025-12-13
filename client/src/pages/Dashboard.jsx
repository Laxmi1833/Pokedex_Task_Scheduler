import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import bgImage from "../assets/pokemon-bg.jpg";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    };

    fetchTasks();
  }, [token]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* dark overlay for readability */}
      <div className="min-h-screen bg-black/50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-black text-yellow-300 mb-6 drop-shadow-lg">
            Trainer Missions
          </h1>

          {tasks.length === 0 ? (
            <p className="text-xl font-bold text-white">
              No missions yet
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
