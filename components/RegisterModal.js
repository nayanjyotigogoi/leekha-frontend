"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterModal({ open, onClose }) {
  const { login } = useAuth(); // ✅ Use your global auth context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await res.json();

      // ✅ Auto-login immediately
      login(data); // same as in LoginModal
      alert("Welcome! Your account has been created successfully.");

      onClose(); // close modal
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-center">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            placeholder="Password (min 6 chars)"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-3 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => {
              onClose();
              document.dispatchEvent(new CustomEvent("open-login"));
            }}
            className="text-blue-600 underline"
          >
            Login
          </button>
        </p>

        <button
          onClick={onClose}
          className="text-sm mt-4 text-gray-500 block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
