"use client";

import Script from "next/script";

const GA_ID = "G-XXXXXXXXXX";
const isProd = typeof window !== "undefined" && window.location.hostname !== "localhost";
const hasRealId = GA_ID !== "G-XXXXXXXXXX";

export default function Analytics() {
  if (!isProd || !hasRealId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
