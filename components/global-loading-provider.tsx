"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import React from "react";

const LoadingContext = createContext<{ loading: boolean }>({ loading: false });

export function useGlobalLoading() {
  return useContext(LoadingContext);
}

// Glitchy text component
function GlitchText({ text }: { text: string }) {
  return (
    <div className="glitch" data-text={text}>
      {text}
      <style jsx>{`
        .glitch {
          position: relative;
          color: #000;
          font-size: 2.5rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          animation: glitch-skew 1s infinite linear alternate-reverse;
        }
        .glitch:before,
        .glitch:after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
          overflow: hidden;
          color: #ff005a;
          z-index: 1;
        }
        .glitch:before {
          animation: glitch-top 1s infinite linear alternate-reverse;
          top: -2px;
        }
        .glitch:after {
          animation: glitch-bottom 1s infinite linear alternate-reverse;
          top: 2px;
          color: #00fff9;
        }
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(2deg); }
          60% { transform: skew(-1deg); }
          80% { transform: skew(1deg); }
          100% { transform: skew(0deg); }
        }
        @keyframes glitch-top {
          0% { clip-path: inset(0 0 80% 0); transform: translate(-2px, -2px);}
          20% { clip-path: inset(0 0 60% 0); transform: translate(2px, 2px);}
          40% { clip-path: inset(0 0 40% 0); transform: translate(-2px, 2px);}
          60% { clip-path: inset(0 0 20% 0); transform: translate(2px, -2px);}
          80% { clip-path: inset(0 0 60% 0); transform: translate(-2px, 2px);}
          100% { clip-path: inset(0 0 80% 0); transform: translate(2px, -2px);}
        }
        @keyframes glitch-bottom {
          0% { clip-path: inset(80% 0 0 0); transform: translate(2px, 2px);}
          20% { clip-path: inset(60% 0 0 0); transform: translate(-2px, -2px);}
          40% { clip-path: inset(40% 0 0 0); transform: translate(2px, -2px);}
          60% { clip-path: inset(20% 0 0 0); transform: translate(-2px, 2px);}
          80% { clip-path: inset(60% 0 0 0); transform: translate(2px, -2px);}
          100% { clip-path: inset(80% 0 0 0); transform: translate(-2px, 2px);}
      `}</style>
    </div>
  );
}

function TypingText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 90);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <span className="typing-text">{displayed}</span>
  );
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