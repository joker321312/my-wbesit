"use client";

import { useState, useEffect } from "react";
import { Menu, ShoppingCart, Gamepad2 } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      background: scrolled ? "rgba(10, 11, 14, 0.9)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(139, 92, 246, 0.15)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s"
    }} className="sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
              <div style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 12px rgba(139, 92, 246, 0.3)"
              }}>
                <Gamepad2 className="w-4 h-4" style={{ color: "#fff" }} />
              </div>
              <span className="text-lg font-black" style={{ color: "#e4e6eb", letterSpacing: "-0.5px" }}>
                Tool<span style={{ color: "#8b5cf6" }}>Hub</span>
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm font-bold" style={{ color: "#8b8fa3" }}>
              <a href="/" className="link-underline" style={{ color: "#8b5cf6", textDecoration: "none" }}>Home</a>
              <a href="/shop" className="link-underline" style={{ color: "#8b8fa3", textDecoration: "none" }}>Arsenal</a>
              <a href="/admin" className="link-underline" style={{ color: "#8b8fa3", textDecoration: "none" }}>Command</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a href="/shop" className="btn btn-primary hidden sm:inline-flex" style={{ padding: "8px 16px", fontSize: 13, textDecoration: "none" }}>
              <ShoppingCart className="w-3.5 h-3.5" />
              Arsenal
            </a>
            <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8b8fa3", padding: 8 }} aria-label="Menu">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ borderTop: "1px solid rgba(139, 92, 246, 0.1)", background: "rgba(10, 11, 14, 0.95)", backdropFilter: "blur(12px)", padding: "16px" }}>
          <div className="flex flex-col gap-3">
            <a href="/" style={{ color: "#8b5cf6", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Home</a>
            <a href="/shop" style={{ color: "#8b8fa3", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Arsenal</a>
            <a href="/admin" style={{ color: "#8b8fa3", textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Command</a>
            <a href="https://discord.com/users/kingkelati123" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: "100%", marginTop: 4 }}>
              💬 DM kingkelati123
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
