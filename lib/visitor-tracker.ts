export function getVisitorStats() {
  if (typeof window === "undefined") return { views: 0, uniqueVisitors: 0, today: 0 };

  const views = parseInt(localStorage.getItem("th_visitor_views") || "0");
  const uniqueVisitors = parseInt(localStorage.getItem("th_unique_visitors") || "0");
  const today = parseInt(localStorage.getItem("th_visitor_today") || "0");
  return { views, uniqueVisitors, today };
}

export function trackVisit() {
  if (typeof window === "undefined") return;

  const views = parseInt(localStorage.getItem("th_visitor_views") || "0");
  localStorage.setItem("th_visitor_views", String(views + 1));

  const todayKey = new Date().toDateString();
  const lastDate = localStorage.getItem("th_visitor_last_date");
  if (lastDate !== todayKey) {
    localStorage.setItem("th_visitor_today", "0");
    localStorage.setItem("th_visitor_last_date", todayKey);
  }
  const today = parseInt(localStorage.getItem("th_visitor_today") || "0");
  localStorage.setItem("th_visitor_today", String(today + 1));

  if (!localStorage.getItem("th_visitor_id")) {
    const id = "v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    localStorage.setItem("th_visitor_id", id);
    const unique = parseInt(localStorage.getItem("th_unique_visitors") || "0");
    localStorage.setItem("th_unique_visitors", String(unique + 1));
  }
}
