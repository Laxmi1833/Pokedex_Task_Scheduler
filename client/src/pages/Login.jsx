import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/pokemon-bg.jpg";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

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
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      
      <div className="absolute inset-0 bg-black/60"></div>

    
      <div className="relative z-10 pokedex-card w-full max-w-md p-8 border-4 border-black bg-gray-400/95 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-black text-blue-700 mb-4 text-center drop-shadow-lg">
          Trainer Login
        </h2>

        {error && (
          <p className="bg-black text-red-400 p-3 rounded mb-4 font-bold text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="trainer@pokemon.com"
            className="pokemon-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="pokemon-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full pokemon-btn-red disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/signup"
            className="text-blue-700 hover:text-red-700 font-bold underline"
          >
            Create Trainer Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
