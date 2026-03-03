"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin"); 
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return <div className="h-screen bg-[#121212] flex items-center justify-center text-white">Loading...</div>;
  }

  return <>{children}</>;
}