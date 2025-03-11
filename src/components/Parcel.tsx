"use client";

import { ReactNode, useEffect, useState } from "react";
import { useParcelContext } from "../context/ParcelContext";
import { ParcelData } from "../types";

interface ParcelProps {
  parcelKey: string;
  apiKey?: string;
  children: (props: ParcelData) => ReactNode;
  className?: string;
}

export function Parcel({
  apiKey: propApiKey,
  children,
  parcelKey,
}: ParcelProps) {
  const [fetchedParcel, setFetchedParcel] = useState<ParcelData | null>(null);
  const contextValue = useParcelContext();

  // Use API key from props or from context
  const apiKey = propApiKey || contextValue?.apiKey;
  const apiBaseUrl = contextValue?.apiBaseUrl || "http://127.0.0.1:3211";

  useEffect(() => {
    if (!parcelKey || !apiKey) return;

    const apiEndpoint = `${apiBaseUrl}/readParcel?parcelKey=${parcelKey}`;

    fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        data.error
          ? console.error(`Error fetching parcel ${parcelKey}`, data.error)
          : setFetchedParcel(data)
      )
      .catch((err) => console.error(err));
  }, [parcelKey, apiKey, apiBaseUrl]);

  if (!apiKey || !parcelKey || !fetchedParcel) return null;

  // Return the result of the children function, passing the props
  return typeof children === "function" ? children(fetchedParcel) : null;
}
