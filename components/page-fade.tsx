"use client";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalLoading } from "./global-loading-provider";
import { useRouteFadeOverlay } from "./route-fade-overlay-context";
import { useEffect, useState, useRef } from "react";

export function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useGlobalLoading();
  const { show: overlayShowing } = useRouteFadeOverlay();
  const [show, setShow] = useState(false);
  const isFirst = useRef(true);

  useEffect(() => {
    // Prevent flash: don't show content until effect runs at least once
    if (isFirst.current) {
      isFirst.current = false;
      setShow(false);
    }
    if (!loading && !overlayShowing) {
      const timeout = setTimeout(() => setShow(true), 300);
      return () => clearTimeout(timeout);
    } else {
      setShow(false);
    }
  }, [pathname, loading, overlayShowing]);

  // Prevent initial render flash
  if (isFirst.current || !show) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}