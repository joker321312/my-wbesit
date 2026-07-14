import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(139, 92, 246, 0.1)", background: "rgba(10, 11, 14, 0.8)", padding: "40px 0" }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-4 h-4" style={{ color: "#8b5cf6" }} />
              <span className="font-black" style={{ color: "#e4e6eb" }}>Tool<span style={{ color: "#8b5cf6" }}>Hub</span></span>
            </div>
            <p className="text-xs" style={{ color: "#5a5e6e", lineHeight: 1.7 }}>
              Elite checker suite for operators. Crypto-only. No KYC. Maximum anonymity.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: "#e4e6eb" }}>Products</h4>
            <div className="flex flex-col gap-2 text-xs" style={{ color: "#5a5e6e" }}>
              <a href="/shop" style={{ color: "#5a5e6e", textDecoration: "none", transition: "color 0.2s" }} onMouseOver={e => e.currentTarget.style.color = "#8b5cf6"} onMouseOut={e => e.currentTarget.style.color = "#5a5e6e"}>Checkers</a>
              <a href="/shop" style={{ color: "#5a5e6e", textDecoration: "none", transition: "color 0.2s" }}>Bypasses</a>
              <a href="/shop" style={{ color: "#5a5e6e", textDecoration: "none", transition: "color 0.2s" }}>Proxies</a>
              <a href="/shop" style={{ color: "#5a5e6e", textDecoration: "none", transition: "color 0.2s" }}>APIs</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: "#e4e6eb" }}>Resources</h4>
            <div className="flex flex-col gap-2 text-xs" style={{ color: "#5a5e6e" }}>
              <a href="/" style={{ color: "#5a5e6e", textDecoration: "none" }}>Documentation</a>
              <a href="/" style={{ color: "#5a5e6e", textDecoration: "none" }}>API Reference</a>
              <a href="/" style={{ color: "#5a5e6e", textDecoration: "none" }}>Status</a>
              <a href="/" style={{ color: "#5a5e6e", textDecoration: "none" }}>Changelog</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-3" style={{ color: "#e4e6eb" }}>Contact</h4>
            <div className="flex flex-col gap-2 text-xs" style={{ color: "#5a5e6e" }}>
              <span>support@toolhub.dev</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6" }} /> Encrypted</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#06b6d4" }} /> Crypto Only</span>
              <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full" style={{ background: "#8b5cf6" }} /> Instant Delivery</span>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-xs" style={{ borderColor: "rgba(139, 92, 246, 0.1)", color: "#5a5e6e" }}>
          &copy; 2026 ToolHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
