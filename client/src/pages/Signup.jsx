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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

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
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${bgImage})`,
      }}
    >
      <div className="pokedex-card w-full max-w-md p-8 border-4 border-black bg-gray-400">

        <div className="mb-6">
          <div className="pokedex-lights mb-4 flex gap-2">
            <div className="bg-red-500 w-8 h-8 rounded-full border-4 border-red-700" />
            <div className="bg-yellow-400 w-5 h-5 rounded-full" />
            <div className="bg-blue-500 w-5 h-5 rounded-full" />
          </div>

          <h2 className="text-4xl font-black text-blue-700 mb-2">
            Register Trainer
          </h2>
          <p className="text-gray-700 text-lg">
            Create your Pokédex account
          </p>
        </div>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 font-bold">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="trainerName"
            value={formData.trainerName}
            onChange={handleChange}
            className="pokemon-input"
            placeholder="Ash Ketchum"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="pokemon-input"
            placeholder="trainer@pokemon.com"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="pokemon-input"
            placeholder="Create a strong password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full pokemon-btn-red disabled:opacity-50"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-blue-700 hover:text-red-700 font-bold underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
