import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 shadow-2xl border-b-8 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <div className="pokedex-lights">
              <div className="light bg-blue-500 w-6 h-6 border-4 border-blue-700"></div>
              <div className="light bg-red-400 w-3 h-3"></div>
              <div className="light bg-yellow-400 w-3 h-3"></div>
              <div className="light bg-green-400 w-3 h-3"></div>
            </div>
            <h1 className="text-3xl font-black text-white tracking-wide drop-shadow-lg">
              Pokédex Task Scheduler
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-white hover:text-yellow-300 font-bold text-lg transition-colors px-4 py-2 rounded hover:bg-red-800"
            >
              Dashboard
            </Link>
            <Link
              to="/add-task"
              className="text-white hover:text-yellow-300 font-bold text-lg transition-colors px-4 py-2 rounded hover:bg-red-800"
            >
              Add Mission
            </Link>
            <button
              onClick={handleLogout}
              className="bg-black hover:bg-gray-900 text-white font-bold px-6 py-2 rounded-lg transition-all transform hover:scale-105 border-2 border-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
