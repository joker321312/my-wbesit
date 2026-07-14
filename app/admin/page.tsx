"use client";

import { useState, useEffect } from "react";
import {
  Package, Download, TrendingUp, Users, Settings, LogOut, Plus,
  Edit3, Trash2, X, Save, ArrowLeft, FileText, ShoppingBag, Star,
  Upload, ExternalLink, Menu, Lock, CheckCircle, AlertTriangle, Eye, UserCheck, Calendar
} from "lucide-react";
import { getVisitorStats } from "@/lib/visitor-tracker";
import { getRealViews } from "@/lib/real-tracker";

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  sales: string;
  featured: boolean;
  image?: string;
  downloadUrl: string;
  version: string;
  fileSize: string;
  createdAt: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  status: "completed" | "refunded" | "pending_crypto";
  date: string;
  cryptoCurrency?: string;
  txHash?: string;
  productId?: string;
}

type Tab = "dashboard" | "products" | "orders" | "upload" | "payments";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Product>({
    id: "", name: "", description: "", price: 0, category: "Checkers",
    rating: 4.5, sales: "0", featured: false, image: "", downloadUrl: "",
    version: "1.0.0", fileSize: "0 MB", createdAt: new Date().toISOString().split("T")[0]
  });

  const [uploadUrl, setUploadUrl] = useState("");
  const [uploadName, setUploadName] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");

  const [realViews, setRealViews] = useState<number | null>(null);

  // Crypto settings
  const [cryptoSettings, setCryptoSettings] = useState({
    btc: "bc1qyourbtcaddresshere",
    eth: "0xyourethaddresshere",
    usdt_erc20: "0xyourusdtaddresshere",
    usdt_trc20: "TYyourtrc20addresshere",
    ltc: "ltc1yourltcaddresshere",
  });

  useEffect(() => {
    getRealViews().then(setRealViews);
    const interval = setInterval(() => getRealViews().then(setRealViews), 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("th_products");
    if (stored) setProducts(JSON.parse(stored));
    else setProducts([]);

    const storedOrders = localStorage.getItem("th_orders");
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    else setOrders([]);

    const storedCrypto = localStorage.getItem("th_crypto_settings");
    if (storedCrypto) setCryptoSettings(JSON.parse(storedCrypto));
  }, []);

  useEffect(() => {
    if (products.length) localStorage.setItem("th_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (orders.length) localStorage.setItem("th_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("th_crypto_settings", JSON.stringify(cryptoSettings));
  }, [cryptoSettings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const totalRevenue = orders.filter(o => o.status === "completed").reduce((s, o) => s + o.amount, 0);
  const totalSales = orders.filter(o => o.status === "completed").length;

  const openNew = () => {
    setForm({ id: "", name: "", description: "", price: 0, category: "Checkers", rating: 4.5, sales: "0", featured: false, image: "", downloadUrl: "", version: "1.0.0", fileSize: "0 MB", createdAt: new Date().toISOString().split("T")[0] });
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setForm({ ...p });
    setEditing(p);
    setShowForm(true);
  };

  const saveToLS = (updated: Product[]) => {
    localStorage.setItem("th_products", JSON.stringify(updated));
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProducts(prev => {
        const updated = prev.map(p => p.id === editing.id ? { ...form, id: editing.id } : p);
        saveToLS(updated);
        return updated;
      });
    } else {
      const id = "p" + Date.now();
      setProducts(prev => {
        const updated = [...prev, { ...form, id }];
        saveToLS(updated);
        return updated;
      });
    }
    setShowForm(false);
    setEditing(null);
  };

  const deleteProduct = (id: string) => {
    if (!confirm("Delete this product?")) return;
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      saveToLS(updated);
      return updated;
    });
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadUrl || !uploadName) return;
    const slug = uploadName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const finalUrl = uploadUrl.endsWith(".zip") ? uploadUrl : `${uploadUrl}/latest.zip`;
    setUploadMsg(`File linked: ${slug}/latest.zip → ${finalUrl}`);
    setUploadUrl("");
    setUploadName("");
    setTimeout(() => setUploadMsg(""), 3000);
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-600/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Admin</h1>
              <p className="text-xs text-zinc-500">ToolHub Panel</p>
            </div>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setLoginError(false); }}
            placeholder="Enter admin password"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 mb-3"
            autoFocus
          />
          {loginError && <p className="text-red-400 text-xs mb-3 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Wrong password</p>}
          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-xl transition-colors">Login</button>
          <p className="text-[10px] text-zinc-700 text-center mt-3">Default: admin123</p>
        </form>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingBag },
    { id: "payments", label: "Payments", icon: Download },
    { id: "upload", label: "Upload", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform`}>
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-600/30 flex items-center justify-center">
            <Settings className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">ToolHub Admin</h1>
            <p className="text-[10px] text-zinc-500">Management Panel</p>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {tabs.map(t => {
            const Icon = t.icon;
            return (
              <button key={t.id} onClick={() => { setTab(t.id); setSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${tab === t.id ? "bg-orange-600/10 text-orange-400 border border-orange-600/20" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-zinc-800">
          <button onClick={() => window.location.href = "/"} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 md:px-6 bg-zinc-950/80 sticky top-0 z-30">
          <button className="md:hidden text-zinc-400" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
          <h2 className="text-sm font-semibold text-white capitalize">{tab}</h2>
          <button onClick={() => { setLoggedIn(false); setPassword(""); }} className="text-xs text-zinc-500 hover:text-red-400 transition-colors flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </header>

        <div className="p-4 md:p-6">
          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Views", value: realViews !== null ? realViews.toLocaleString() : "...", icon: Eye, color: "text-purple-500" },
                  { label: "Unique Visitors", value: getVisitorStats().uniqueVisitors.toLocaleString(), icon: UserCheck, color: "text-cyan-500" },
                  { label: "Live Now", value: "—", icon: Calendar, color: "text-green-500" },
                  { label: "Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: TrendingUp, color: "text-orange-500" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">{s.label}</span>
                        <Icon className={`w-4 h-4 ${s.color}`} />
                      </div>
                      <span className="text-xl font-bold text-white">{s.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Products", value: products.length, icon: Package, color: "text-orange-500" },
                  { label: "Total Orders", value: totalSales, icon: ShoppingBag, color: "text-green-500" },
                  { label: "Live Now", value: "—", icon: Eye, color: "text-purple-500" },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-zinc-500">{s.label}</span>
                        <Icon className={`w-4 h-4 ${s.color}`} />
                      </div>
                      <span className="text-xl font-bold text-white">{s.value}</span>
                    </div>
                  );
                })}
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-500" /> Real-Time Analytics
                </h3>
                <p className="text-xs text-zinc-500 mb-3">
                  <span className="text-purple-400">Total Views</span> now shows real visitor counts from all users via CountAPI (updates every 10s).
                </p>
                <p className="text-xs text-zinc-500 mb-3">
                  For detailed analytics (location, pages, devices), set up Google Analytics:
                </p>
                <ol className="text-xs text-zinc-400 space-y-1.5 list-decimal list-inside">
                  <li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500 underline">analytics.google.com</a> and create a GA4 property</li>
                  <li>Get your <span className="text-purple-400">Measurement ID</span> (starts with <code className="text-[10px] bg-zinc-800 px-1 rounded">G-</code>)</li>
                  <li>Open <code className="text-[10px] bg-zinc-800 px-1 rounded">components/Analytics.tsx</code> and replace <code className="text-[10px] bg-zinc-800 px-1 rounded">G-XXXXXXXXXX</code> with your ID</li>
                  <li>Check <span className="text-purple-400">Realtime</span> report in Google Analytics</li>
                </ol>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-white mb-3">Recent Orders</h3>
                <div className="space-y-2">
                  {orders.slice(0, 5).map(o => (
                    <div key={o.id} className="flex items-center justify-between text-xs bg-zinc-950/50 rounded-lg p-3">
                      <div>
                        <span className="text-zinc-300">{o.customer}</span>
                        <span className="text-zinc-600 ml-2">{o.product}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-zinc-400">${o.amount.toFixed(2)}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${o.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{o.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-zinc-500">{products.length} products</p>
                <button onClick={openNew} className="flex items-center gap-1.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                  <Plus className="w-4 h-4" /> Add Product
                </button>
              </div>

              {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/60" onClick={() => setShowForm(false)} />
                  <form onSubmit={saveProduct} className="relative bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-white">{editing ? "Edit Product" : "New Product"}</h3>
                      <button type="button" onClick={() => setShowForm(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-3">
                      <div><label className="text-xs text-zinc-400 block mb-1">Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" required /></div>
                      <div><label className="text-xs text-zinc-400 block mb-1">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={2} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600 resize-none" required /></div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs text-zinc-400 block mb-1">Price ($)</label><input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" required /></div>
                        <div><label className="text-xs text-zinc-400 block mb-1">Category</label><select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600"><option>Checkers</option><option>Proxies</option><option>APIs</option><option>Bypasses</option></select></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="text-xs text-zinc-400 block mb-1">Version</label><input value={form.version} onChange={e => setForm({ ...form, version: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" /></div>
                        <div><label className="text-xs text-zinc-400 block mb-1">File Size</label><input value={form.fileSize} onChange={e => setForm({ ...form, fileSize: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" /></div>
                      </div>
                      <div><label className="text-xs text-zinc-400 block mb-1">Image URL</label><input value={form.image || ""} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" /></div>
                      <div><label className="text-xs text-zinc-400 block mb-1">Download URL</label><input value={form.downloadUrl} onChange={e => setForm({ ...form, downloadUrl: e.target.value })} placeholder="https://..." className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-sm text-white focus:outline-none focus:border-orange-600" /></div>
                      <div className="flex items-center gap-2"><input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} className="accent-orange-600" /><label htmlFor="featured" className="text-xs text-zinc-400">Featured product</label></div>
                    </div>
                    <div className="flex gap-2 mt-5">
                      <button type="submit" className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-1.5"><Save className="w-4 h-4" /> {editing ? "Update" : "Create"}</button>
                      <button type="button" onClick={() => setShowForm(false)} className="px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-2.5 rounded-xl text-sm transition-colors">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-2">
                {products.map(p => (
                  <div key={p.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {p.image && <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-white truncate">{p.name}</h4>
                          {p.featured && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <p className="text-xs text-zinc-500 mt-0.5">{p.category} &bull; ${p.price.toFixed(2)} &bull; {p.sales} sales</p>
                        <p className="text-[10px] text-zinc-700 truncate mt-0.5">{p.downloadUrl}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-3 shrink-0">
                      <button onClick={() => openEdit(p)} className="p-2 text-zinc-500 hover:text-orange-400 hover:bg-zinc-800 rounded-lg transition-all"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === "orders" && (
            <div>
              <p className="text-sm text-zinc-500 mb-4">{orders.length} orders</p>
              <div className="space-y-2">
                {orders.map(o => (
                  <div key={o.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-zinc-500">{o.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] ${o.status === "completed" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>{o.status}</span>
                        </div>
                        <h4 className="text-sm font-medium text-white mt-1">{o.customer}</h4>
                        <p className="text-xs text-zinc-500">{o.email} &bull; {o.product}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white">${o.amount.toFixed(2)}</span>
                        <p className="text-[10px] text-zinc-600">{o.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS */}
          {tab === "payments" && (
            <div>
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-white mb-4">Crypto Wallet Addresses</h3>
                <p className="text-xs text-zinc-500 mb-4">Set your wallet addresses. Customers will pay to these addresses.</p>
                <div className="space-y-3 max-w-md">
                  {[
                    { key: "btc", label: "Bitcoin (BTC)", icon: "₿" },
                    { key: "eth", label: "Ethereum (ETH)", icon: "Ξ" },
                    { key: "usdt_erc20", label: "USDT (ERC-20)", icon: "$" },
                    { key: "usdt_trc20", label: "USDT (TRC-20)", icon: "$" },
                    { key: "ltc", label: "Litecoin (LTC)", icon: "Ł" },
                  ].map(c => (
                    <div key={c.key} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1">
                        <span className="text-orange-500">{c.icon}</span> {c.label}
                      </div>
                      <input
                        value={cryptoSettings[c.key as keyof typeof cryptoSettings]}
                        onChange={e => setCryptoSettings(prev => ({ ...prev, [c.key]: e.target.value }))}
                        placeholder={c.key === "btc" ? "bc1..." : c.key === "eth" ? "0x..." : "T..."}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600 font-mono text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-8">
                <h3 className="text-sm font-semibold text-white mb-4">Pending Crypto Payments</h3>
                {orders.filter(o => o.status === "pending_crypto").length === 0 ? (
                  <p className="text-zinc-500 text-center py-8">No pending crypto payments</p>
                ) : (
                  <div className="space-y-2">
                    {orders.filter(o => o.status === "pending_crypto").map(o => (
                      <div key={o.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-zinc-500">{o.id}</span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-yellow-500/10 text-yellow-400">Awaiting Payment</span>
                            </div>
                            <h4 className="text-sm font-medium text-white mt-1">{o.customer}</h4>
                            <p className="text-xs text-zinc-500">{o.email} &bull; {o.product} &bull; ${o.amount.toFixed(2)}</p>
                            {o.cryptoCurrency && <p className="text-xs text-zinc-500 mt-1">Expected: {o.cryptoCurrency} &bull; TX: {o.txHash || "pending"}</p>}
                          </div>
                          <div className="flex items-center gap-2 ml-4 shrink-0">
                            <button
                              onClick={() => setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: "completed" as const } : x))}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              <CheckCircle className="w-3 h-3 inline mr-1" /> Mark Paid
                            </button>
                            <button
                              onClick={() => setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: "refunded" as const } : x))}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* UPLOAD */}
          {tab === "upload" && (
            <div>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 max-w-lg">
                <h3 className="text-sm font-semibold text-white mb-1">Link Download File</h3>
                <p className="text-xs text-zinc-500 mb-4">Enter a direct download URL for your tool file.</p>
                <form onSubmit={handleUpload} className="space-y-3">
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Tool Name</label>
                    <input value={uploadName} onChange={e => setUploadName(e.target.value)} placeholder="e.g. My Tool Name" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600" required />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 block mb-1">Download URL</label>
                    <input value={uploadUrl} onChange={e => setUploadUrl(e.target.value)} placeholder="https://yourstorage.com/file.zip" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-orange-600" required />
                  </div>
                  <button type="submit" className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-colors">
                    <Upload className="w-4 h-4" /> Link File
                  </button>
                </form>
                {uploadMsg && (
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-xs bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                    <CheckCircle className="w-4 h-4" /> {uploadMsg}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-white mb-3">Current Download Links</h3>
                <div className="space-y-2">
                  {products.filter(p => p.downloadUrl).map(p => (
                    <div key={p.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs text-zinc-300 block truncate">{p.name}</span>
                        <span className="text-[10px] text-zinc-600 block truncate">{p.downloadUrl}</span>
                      </div>
                      <a href={p.downloadUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-zinc-500 hover:text-orange-400 transition-colors shrink-0"><ExternalLink className="w-4 h-4" /></a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
