"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

// Dynamically import components that are not critical for initial render
const TopSlider = dynamic(() => import("@/components/home/TopSlider"));
const OurServices = dynamic(() => import("@/components/home/OurServices"));
const CarCategory = dynamic(() => import("@/components/home/CarCategory"));
const CarSuggest = dynamic(() => import("@/components/home/CarSuggest"));
const FeaturedAds = dynamic(() => import("@/components/home/FeaturedAds"));
const LiveBiddingBanner = dynamic(() =>
  import("@/components/home/LiveBiddingBanner")
);
const ManagedByUsBanner = dynamic(() =>
  import("@/components/home/ManagedByUsBanner")
);
const BecomeMember = dynamic(() =>
  import("@/components/home/BecomeMember")
);
const PopularNewCars = dynamic(() =>
  import("@/components/home/PopularNewCars")
);
const CarInspectionBanner = dynamic(() =>
  import("@/components/home/CarInspectionBanner")
);
const NewLaunchedCars = dynamic(() =>
  import("@/components/home/NewLaunchedCars")
);
const OurVideos = dynamic(() => import("@/components/home/OurVideos"));
const AboutBanner = dynamic(() => import("@/components/home/AboutBanner"));
const PaymentPartners = dynamic(() =>
  import("@/components/home/PaymentPartners")
);
const GetAppBanner = dynamic(() =>
  import("@/components/home/GetAppBanner")
);

export default function Home() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      console.warn("Google Client ID is not defined in environment variables");
    } else {
      console.log("Client ID:", clientId);
    }
  }, [clientId]);

  return (
    <main>
      <TopSlider />
      <OurServices />
      <CarCategory />
      <CarSuggest />
      <FeaturedAds />
      <LiveBiddingBanner />
      <ManagedByUsBanner />
      <BecomeMember />
      <PopularNewCars />
      <CarInspectionBanner />
      <NewLaunchedCars />
      <OurVideos />
      <AboutBanner />
      <PaymentPartners />
      <GetAppBanner />
    </main>
  );
}
