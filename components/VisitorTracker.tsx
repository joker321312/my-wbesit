"use client";

import { useEffect } from "react";
import { trackVisit } from "@/lib/visitor-tracker";
import { hitView } from "@/lib/real-tracker";

export default function VisitorTracker() {
  useEffect(() => {
    trackVisit();
    hitView();
  }, []);

  return null;
}
