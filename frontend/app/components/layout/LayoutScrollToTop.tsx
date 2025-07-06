"use client";
import { useEffect } from "react";

export default function LayoutScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
} 