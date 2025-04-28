"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.clear();
    router.push("http://localhost:3000/login");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setToken(savedToken);
    } else {
      fetch("http://localhost:3000/api/check-session", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("accessToken", data.token);
          setToken(data.token);
        })
        .catch(() => {
          window.location.href = "http://localhost:3000/login";
        });
    }
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">Reacto</h1>
      <p>
        {token
          ? `Logged in with token: ${token.slice(0, 20)}...`
          : "Not logged in"}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
