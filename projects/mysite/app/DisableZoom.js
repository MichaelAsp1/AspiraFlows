"use client";
import { useEffect } from "react";

export default function DisableZoom() {
  useEffect(() => {
    const block = (e) => e.preventDefault();

    // iOS Safari pinch/gesture zoom
    document.addEventListener("gesturestart", block, { passive: false });
    document.addEventListener("gesturechange", block, { passive: false });
    document.addEventListener("gestureend", block, { passive: false });

    // Double-tap zoom
    let lastTouch = 0;
    const onTouchStart = (e) => {
      const now = Date.now();
      if (now - lastTouch <= 350) e.preventDefault();
      lastTouch = now;
    };
    document.addEventListener("touchstart", onTouchStart, { passive: false });

    // Ctrl + wheel zoom (desktop)
    const onWheel = (e) => { if (e.ctrlKey) e.preventDefault(); };
    document.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", block);
      document.removeEventListener("gesturechange", block);
      document.removeEventListener("gestureend", block);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
