"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useRouteFadeOverlay } from "./route-fade-overlay-context";



export function RouteFadeOverlay() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const { show, setShow } = useRouteFadeOverlay();

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    setShow(true);
    const timeout = setTimeout(() => setShow(false), 500); // was 750
    return () => clearTimeout(timeout);
  }, [pathname, setShow]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="route-fade"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // was 0.75
          className="fixed inset-0 z-[9999] bg-white pointer-events-none"
        />
      )}
    </AnimatePresence>
  );
  
}
