"use client"; // Add this at the top to mark this file as client-side

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import this component with SSR disabled
const CarDealers = dynamic(() => import('@/components/CarDealers/index'), { ssr: false });

export default function CarDealersPage() {
  return (
    <CarDealers />
  );
}
