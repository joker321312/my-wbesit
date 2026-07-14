"use client";

import { useEffect } from "react";
import { trackVisit } from "@/lib/visitor-tracker";

export default function VisitorTracker() {
  useEffect(() => {
    trackVisit();
  }, []);

  return null;
}
