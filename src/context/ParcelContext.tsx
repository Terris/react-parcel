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
  apiBaseUrl = "http://127.0.0.1:3211",
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
