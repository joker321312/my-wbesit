import { Star, MessageCircle, Gamepad2 } from "lucide-react";
import type { Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card overflow-hidden group">
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a1d24, #13151a)" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent)"
        }} />
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
        ) : (
          <Gamepad2 className="w-10 h-10" style={{ color: "#8b5cf6", opacity: 0.5 }} />
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="badge" style={{ fontSize: 10 }}>In Stock</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold" style={{ color: "#06b6d4" }}>{product.category}</span>
          {product.featured && (
            <span className="badge" style={{ fontSize: 10 }}>Featured</span>
          )}
        </div>
        <h3 className="font-bold" style={{ color: "#e4e6eb", fontSize: 15 }}>{product.name}</h3>
        <p className="text-xs mt-1" style={{ color: "#8b8fa3", lineHeight: 1.4 }}>{product.description}</p>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-3 h-3" style={{
              color: i < Math.floor(product.rating) ? "#f59e0b" : "#2a2d35",
              fill: i < Math.floor(product.rating) ? "#f59e0b" : "none"
            }} />
          ))}
          <span className="text-xs ml-1" style={{ color: "#5a5e6e" }}>{product.rating}</span>
          <span className="text-xs ml-auto" style={{ color: "#5a5e6e" }}>{product.sales} sold</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(42, 45, 53, 0.5)" }}>
          <span className="font-black text-lg" style={{ color: "#e4e6eb" }}>${product.price.toFixed(2)}</span>
          <a
            href="https://discord.com/users/kingkelati123"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: "7px 14px", fontSize: 13, textDecoration: "none" }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            DM to Buy
          </a>
        </div>
      </div>
    </div>
  );
}
