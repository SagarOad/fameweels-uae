"use client"; // Add this at the top to mark this file as client-side

import dynamic from "next/dynamic";
import React from "react";

// Dynamically import this component with SSR disabled
const BecomeMember = dynamic(() => import('@/components/BecomeMember/index'), { ssr: false });



const MemberComponentPayFast = () => {

 

  return (
    <BecomeMember />
  );
};

export default MemberComponentPayFast;
