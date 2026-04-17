"use client";

import { useState, useEffect } from "react";
import FlowBgLight from "./FlowBgLight";

export default function FlowBgWithTheme() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ position: "fixed", inset: 0, background: "#0a0a15", zIndex: -1 }} />;
  }

  return <FlowBgLight zIndex={-1} />;
}
