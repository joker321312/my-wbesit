"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProducts, type Product } from "@/lib/data";
import { Filter, ChevronDown, Search, Skull, Filter as FilterIcon } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const load = () => {
      const data = getProducts();
      setProducts(data);
      setFiltered(data);
    };
    load();
    window.addEventListener("storage", load);
    const interval = setInterval(load, 1000);
    return () => {
      window.removeEventListener("storage", load);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    let result = products;
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (category !== "All") result = result.filter(p => p.category === category);
    setFiltered(result);
  }, [products, search, category]);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  return (
    <>
      <Header />
      <section className="border-b border-zinc-800/30 bg-zinc-950/50 backdrop-blur relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Skull className="w-7 h-7 text-red-500" />
            <h1 className="text-3xl font-black text-white">FULL ARSENAL</h1>
          </div>
          <p className="text-zinc-500">Browse the complete collection of checker tools</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="input w-full sm:w-auto"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <p className="text-sm text-zinc-500 mb-6">{filtered.length} of {products.length} tools</p>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-zinc-500">
            <Skull className="w-12 h-12 mx-auto mb-4 text-red-500/50" />
            <p>No tools found matching your criteria</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}