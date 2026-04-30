"use client";

import { useEffect, useRef } from "react";
import { trackAd } from "../api/trackAd";

type Params = {
  adId: number;
  variantId?: string;
  placement?: string;
};

export function useAdTracking({ adId, variantId, placement }: Params) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;

    trackedRef.current = true;

    trackAd({
      adId,
      type: "impression",
      placement,
      variantId,
    });
  }, [adId, variantId, placement]);

  const handleClick = () => {
    trackAd({
      adId,
      type: "click",
      placement,
      variantId,
    });
  };

  return {
    handleClick,
  };
}