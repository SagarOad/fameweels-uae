"use client"; // Add this at the top to mark this file as client-side

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import this component with SSR disabled
const UpcomingBiddings = dynamic(
  () => import("@/components/UpcomingBiddings/index"),
  { ssr: false }
);

const page = () => {
  return <UpcomingBiddings />;
};

export default page;
