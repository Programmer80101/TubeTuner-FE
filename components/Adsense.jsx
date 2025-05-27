"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Adsense() {
  const path = usePathname();

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, [path]);

  if (process.env.NODE_ENV !== "production") return null;

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
      strategy="lazyOnload"
    />
  );
}
