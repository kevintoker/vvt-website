"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const LoadingContext = createContext<{ loading: boolean }>({ loading: false });

export function useGlobalLoading() {
  return useContext(LoadingContext);
}

function BlockRevealText({ text }: { text: string }) {
  return (
      <span className="block-reveal-text">{text} 
        <style jsx>{`
    .block-reveal-text {
      display: inline-block;
      color: #861F41;
      font-size: 4rem;
      letter-spacing: 0px;
      font-weight: 600;
      text-transform: uppercase;
      font-family: 'Satoshi', 'Inter', 'Arial', sans-serif;
      position: relative;
      overflow: hidden;
      clip-path: inset(0 100% 0 0);
      opacity: 1;
      animation: 
        block-reveal 0.25s cubic-bezier(0.77,0,0.18,1) forwards,
        fade-out 0.25s ease 0.75s forwards;
    }

    @keyframes block-reveal {
      to {
        clip-path: inset(0 0 0 0);
      }
    }

    @keyframes fade-out {
      to {
        opacity: 0;
      }
    }
  `}</style>
    </span>
  );
}

export function GlobalLoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setLoading(false), 1000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  // Only render children after hydration and loading is false
  return (
    <LoadingContext.Provider value={{ loading }}>
      {hydrated && loading && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]" style={{ backgroundColor: "hsl(var(--background))"}}>
          <BlockRevealText text="Valorant At Virginia Tech" />
        </div>
      )}
      {hydrated && !loading && children}
    </LoadingContext.Provider>
  );
}