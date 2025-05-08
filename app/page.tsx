"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // const handleLogout = async () => {
  //   await fetch("http://localhost:3000/api/logout", {
  //     method: "POST",
  //     credentials: "include",
  //   });
  //   localStorage.clear();
  //   router.push(
  //     "http://localhost:3000/login?redirect_uri=http://localhost:3001"
  //   );
  // };

  // const handleCheckSession = () => {
  //   const savedToken = localStorage.getItem("accessToken");
  //   // debugger;
  //   if (savedToken !== undefined) {
  //     setToken(savedToken);
  //   } else {
  //     fetch("http://localhost:3000/api/check-session", {
  //       credentials: "include",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         localStorage.setItem("accessToken", data.token);
  //         setToken(data.token);
  //       })
  //       .catch(() => {
  //         window.location.href = "http://localhost:3000/login";
  //       });
  //   }
  // };

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/api/logout");
    localStorage.clear();
    router.push(
      "http://localhost:3000/login?redirect_uri=http://localhost:3001"
    );
  };
  const handleCheckSession = () => {
    // debugger;
    const savedToken = localStorage.getItem("accessToken");
    // if (savedToken) {
    //   setToken(savedToken);
    // }
    // else {
    axios
      .get("http://localhost:3000/api/check-session", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.token);
          setToken(res.data.token);
        } else {
          localStorage.removeItem("accessToken");
          window.location.href =
            "http://localhost:3000/login?redirect_uri=http://localhost:3001";
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        window.location.href =
          "http://localhost:3000/login?redirect_uri=http://localhost:3001";
      });
    // }
  };
  useEffect(() => {
    handleCheckSession();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-semibold">App 1</h1>
      <p>
        {token
          ? `Logged in with token: ${token.slice(0, 20)}...`
          : "Not logged in"}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
