const API = "https://api.countapi.xyz";
const NAMESPACE = "toolhub-marketplace";

export async function getRealViews(): Promise<number> {
  try {
    const res = await fetch(`${API}/get/${NAMESPACE}/views`);
    const data = await res.json();
    return data.value || 0;
  } catch {
    return 0;
  }
}

export async function hitView(): Promise<number> {
  try {
    const res = await fetch(`${API}/hit/${NAMESPACE}/views`);
    const data = await res.json();
    return data.value || 0;
  } catch {
    return 0;
  }
}

export async function getVisitorLocation(): Promise<{ country: string; city: string; ip: string } | null> {
  try {
    const res = await fetch("https://ip-api.com/json/?fields=country,city,query");
    const data = await res.json();
    return data.country ? { country: data.country, city: data.city, ip: data.query } : null;
  } catch {
    return null;
  }
}
