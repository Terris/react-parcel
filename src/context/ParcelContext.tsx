"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface ParcelContextProps {
  apiKey: string;
  apiBaseUrl?: string;
}

const ParcelContext = createContext<ParcelContextProps | undefined>(undefined);

interface ParcelProviderProps {
  apiKey: string;
  apiBaseUrl?: string;
  children: ReactNode;
}

export function ParcelProvider({
  apiKey,
  apiBaseUrl = "https://prestigious-rat-995.convex.site",
  children,
}: ParcelProviderProps) {
  return (
    <ParcelContext.Provider value={{ apiKey, apiBaseUrl }}>
      {children}
    </ParcelContext.Provider>
  );
}

export function useParcelContext() {
  return useContext(ParcelContext);
}
