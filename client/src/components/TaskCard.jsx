import { useNavigate } from "react-router-dom";
import { Edit, Calendar } from "lucide-react";

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function TaskCard({ task }) {
  const navigate = useNavigate();

  const priorityConfig = {
    NORMAL: {
      label: "Normal Mission",
      badge: "bg-green-400 text-black",
      border: "border-green-400",
      glow: "shadow-green-400/50",
    },
    GYM: {
      label: "Gym Mission",
      badge: "bg-blue-400 text-black",
      border: "border-blue-400",
      glow: "shadow-blue-400/50",
    },
    ELITE: {
      label: "Elite Mission",
      badge: "bg-red-500 text-white",
      border: "border-red-500",
      glow: "shadow-red-500/50",
    },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.NORMAL;

  return (
    <div
      className={`
        relative
        bg-gradient-to-br from-slate-900 via-black to-slate-800
        border-4 ${priority.border}
        rounded-2xl
        p-6
        text-white
        shadow-xl ${priority.glow}
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-2xl
        overflow-hidden
      `}
    >
      {/* Pokédex lights */}
      <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-red-500 animate-pulse" />
      <div className="absolute top-3 left-8 w-2 h-2 rounded-full bg-yellow-400" />
      <div className="absolute top-3 left-12 w-2 h-2 rounded-full bg-green-400" />

      {/* Priority badge */}
      <span
        className={`
          absolute top-4 right-4
          px-3 py-1 text-xs font-extrabold rounded-full
          ${priority.badge}
        `}
      >
        {priority.label}
      </span>

      <h3 className="text-2xl font-black text-yellow-300 mb-2 pr-32">
        {task.title}
      </h3>

      <p className="text-gray-300 text-sm mb-6 min-h-[60px]">
        {task.description || "No mission details available."}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar size={16} className="text-blue-400" />
          <span>
            <b>Deadline:</b>{" "}
            <span className="text-blue-400 font-bold">
              {formatDate(task.deadline)}
            </span>
          </span>
        </div>

        <button
          onClick={() => navigate(`/edit-task/${task.id}`)} // ✅ FIX
          className="
            flex items-center gap-2
            bg-black hover:bg-gray-800
            text-white font-extrabold text-sm
            px-4 py-2 rounded-xl
            border-2 border-yellow-400
            transition-all
            hover:scale-105
          "
        >
          <Edit size={16} />
          Edit
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
    </div>
  );
}

export default TaskCard;
