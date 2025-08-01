"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function ThemeToggleWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing on server to avoid hydration mismatch
  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder with same dimensions
  }

  return <ThemeToggle />;
}
