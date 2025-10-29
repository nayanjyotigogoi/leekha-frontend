"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginModal({ open, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      login(data);
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-center">Login Required</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="text-sm mt-4 text-gray-500 block mx-auto"
        >
          Cancel
        </button>
                <p className="text-center text-sm mt-3 text-gray-600">
            Don’t have an account?{" "}
            <button
                onClick={() => {
                onClose();
                // You can open your RegisterModal here if you manage it in parent component
                document.dispatchEvent(new CustomEvent("open-register"));
                }}
                className="text-blue-600 underline"
            >
                Register
            </button>
        </p>
    </div>

    </div>
  );
}
