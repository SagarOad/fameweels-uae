"use client"; // Add this at the top to mark this file as client-side

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import this component with SSR disabled
const MainPage = dynamic(() => import("@/components/MainPage/index"), {
  ssr: false,
});

export default function Home() {
  //  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return <MainPage />;
}
