"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function LikeButton({ writingId }) {
  const { user, token } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLike = async () => {
    if (!user) {
      setOpen(true); // show login modal
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          target_id: writingId,
          target_type: "App\\Models\\Writing",
        }),
      });

      if (res.ok) {
        alert("Liked!");
      } else {
        alert("Error liking post");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button onClick={handleLike} className="text-blue-500 hover:text-blue-700">
        ❤️ Like
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
