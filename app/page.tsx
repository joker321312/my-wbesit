"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getProducts, type Product } from "@/lib/data";
import { Zap, Shield, Swords, Gamepad2, Trophy } from "lucide-react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    const next = getProducts();
    setProducts(prev => JSON.stringify(prev) === JSON.stringify(next) ? prev : next);
  };

  useEffect(() => {
    loadProducts();
    window.addEventListener("storage", loadProducts);
    const interval = setInterval(loadProducts, 1000);
    return () => {
      window.removeEventListener("storage", loadProducts);
      clearInterval(interval);
    };
  }, []);

  const featured = products.filter((p) => p.featured);
  const checkers = products.filter((p) => p.category === "Checkers");

  return (
    <>
      <div className="gaming-bg" aria-hidden="true" />
      <div className="gaming-grid" aria-hidden="true" />
      <div className="gaming-glow" aria-hidden="true" />
      <div className="gaming-particles" aria-hidden="true">
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" /><div className="particle" /><div className="particle" />
        <div className="particle" />
      </div>
      <Header />
      <main>
        <section className="relative overflow-hidden min-h-[85vh] flex items-center">
          <div className="max-w-5xl mx-auto px-4 py-20 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 badge mb-6 animate-fade-in">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>Premium Gaming Suite</span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-5 animate-slide-up" style={{ color: "#e4e6eb" }}>
                Level Up Your
                <br />
                <span style={{ color: "#8b5cf6" }} className="glow-text">Tool</span>
                <span style={{ color: "#06b6d4" }}>Hub</span>
                <span style={{ color: "#8b5cf6" }} className="glow-text"> Arsenal</span>
              </h1>
              <p className="text-lg animate-slide-up" style={{ animationDelay: "100ms", color: "#8b8fa3" }}>
                DM to buy. Quick response. Secure delivery.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up" style={{ animationDelay: "200ms" }}>
                <a href="https://discord.com/users/kingkelati123" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                  <Gamepad2 className="w-5 h-5" />
                  DM kingkelati123
                </a>
                <a href="/shop" className="btn btn-cyber" style={{ fontSize: 16, padding: "14px 32px" }}>
                  <Swords className="w-5 h-5" />
                  Browse Arsenal
                </a>
              </div>
              <div className="flex justify-center gap-6 mt-8 text-sm animate-fade-in" style={{ animationDelay: "300ms", color: "#5a5e6e" }}>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" style={{ color: "#8b5cf6" }} /> DM to buy</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" style={{ color: "#06b6d4" }} /> Quick response</span>
                <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" style={{ color: "#8b5cf6" }} /> Secure delivery</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" style={{ color: "#8b5cf6" }} />
                <h2 className="text-2xl font-black" style={{ color: "#e4e6eb" }}>WHY TOOLHUB</h2>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                { icon: "💬", label: "DM to Buy", desc: "Message kingkelati123 on Discord." },
                { icon: "🤝", label: "Fast Reply", desc: "Quick response and support." },
                { icon: "🔒", label: "Secure", desc: "Safe and trusted delivery." },
              ].map((item, i) => (
                <div key={i} className="card p-6 text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(139, 92, 246, 0.1)", border: "1px solid rgba(139, 92, 246, 0.15)" }}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-bold mb-1" style={{ color: "#e4e6eb" }}>{item.label}</h3>
                  <p className="text-sm" style={{ color: "#8b8fa3" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Swords className="w-5 h-5" style={{ color: "#06b6d4" }} />
              <h2 className="text-xl font-black" style={{ color: "#e4e6eb" }}>FEATURED TOOLS</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5" style={{ color: "#8b5cf6" }} />
              <h2 className="text-xl font-black" style={{ color: "#e4e6eb" }}>CHECKERS</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {checkers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
