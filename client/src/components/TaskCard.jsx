import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';

function TaskCard({ task }) {
  const navigate = useNavigate();

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'Gym Mission':
        return 'priority-gym';
      case 'Elite Mission':
        return 'priority-elite';
      default:
        return 'priority-normal';
    }
  };

  const getCardBorderColor = (priority) => {
    switch (priority) {
      case 'Gym Mission':
        return 'border-blue-500';
      case 'Elite Mission':
        return 'border-red-600';
      default:
        return 'border-yellow-400';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-xl border-4 ${getCardBorderColor(
        task.priority
      )} p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl relative`}
    >
      <div className="absolute top-4 right-4">
        <span className={getPriorityClass(task.priority)}>{task.priority}</span>
      </div>

      <h3 className="text-2xl font-black text-red-600 mb-3 pr-32">{task.title}</h3>

      <p className="text-gray-700 text-lg mb-4 min-h-[60px]">{task.description}</p>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          <span className="font-bold">Deadline:</span>{' '}
          <span className="text-blue-600 font-semibold">{task.deadline}</span>
        </div>

        <button
          onClick={() => navigate(`/edit-task/${task.id}`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105"
        >
          <Edit size={18} />
          Edit
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
