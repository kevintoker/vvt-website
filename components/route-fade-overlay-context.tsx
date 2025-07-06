"use client";
import React, { createContext, useContext, useState } from "react";

const RouteFadeOverlayContext = createContext<{ show: boolean; setShow: (v: boolean) => void }>({
  show: false,
  setShow: () => {},
});

export function RouteFadeOverlayProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <RouteFadeOverlayContext.Provider value={{ show, setShow }}>
      {children}
    </RouteFadeOverlayContext.Provider>
  );
}

export function useRouteFadeOverlay() {
  return useContext(RouteFadeOverlayContext);
}
