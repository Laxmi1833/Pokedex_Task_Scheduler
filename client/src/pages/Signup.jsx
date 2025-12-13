import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/pokemon-bg.jpg";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    trainerName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
      }}
    >
      <div className="w-full max-w-md bg-red-600 border-[6px] border-black rounded-xl shadow-[0_0_30px_#ffcc00] p-1">

        {/* Pokédex Frame */}
        <div className="bg-gray-300 rounded-lg p-6 border-4 border-black">

          {/* Lights */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border-4 border-white shadow-inner" />
            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-yellow-400" />
            <div className="w-4 h-4 rounded-full bg-green-500" />
          </div>

          {/* Title */}
          <h2 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-2 tracking-wide">
            Trainer Registration
          </h2>
          <p className="text-gray-700 font-semibold mb-6">
            Begin your Pokémon journey
          </p>

          {error && (
            <div className="bg-red-200 text-red-800 font-bold p-3 rounded mb-4 border-2 border-red-700">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="trainerName"
              value={formData.trainerName}
              onChange={handleChange}
              placeholder="Trainer Name"
              className="w-full px-4 py-3 rounded border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white font-semibold"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="trainer@pokemon.com"
              className="w-full px-4 py-3 rounded border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white font-semibold"
              required
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full px-4 py-3 rounded border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-400 bg-white font-semibold"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-yellow-400 border-4 border-black rounded-lg text-xl font-black hover:bg-yellow-300 active:scale-95 transition disabled:opacity-60"
            >
              {loading ? "Registering Trainer..." : "Start Adventure 🚀"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-bold text-blue-700 hover:text-red-700 underline"
            >
              Already a Trainer? Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;
