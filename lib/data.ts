export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  sales: string;
  featured: boolean;
  image?: string;
}

const DEFAULT_PRODUCTS: Product[] = [];

export function getProducts(): Product[] {
  if (typeof window === "undefined") return DEFAULT_PRODUCTS;
  try {
    const stored = localStorage.getItem("th_products");
    if (stored) return JSON.parse(stored);
  } catch {}
  localStorage.setItem("th_products", JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}