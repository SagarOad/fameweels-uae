"use client"; // Add this at the top to mark this file as client-side

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import this component with SSR disabled
const Bidding = dynamic(() => import('@/components/BiddingPage/index'), { ssr: false });

const LiveBidding = () => {


  return (
    <Bidding />
  );
};

export default LiveBidding;
