"use client";

import React from "react";
import {
  Parcel,
  ParcelReader,
  ParcelProvider,
  defaultSanitizerConfig,
} from "../../src/next";

const API_KEY = "your-api-key";

// Example for Next.js application
export default function NextJsExample() {
  return (
    <div className="nextjs-example">
      <h1>Next.js Example</h1>

      <ParcelProvider
        apiKey={API_KEY}
        apiBaseUrl="https://parcel-api-endpoint.com"
      >
        <div className="content">
          <Parcel parcelKey="nextjs-parcel">
            {({ name, description, document }) => (
              <div className="parcel-content">
                <h2 className="parcel-title">{name}</h2>
                <div className="parcel-description">{description}</div>
                <div className="parcel-document">
                  <ParcelReader
                    document={document}
                    className="document-container"
                    sanitizeOptions={defaultSanitizerConfig}
                  />
                </div>
              </div>
            )}
          </Parcel>
        </div>
      </ParcelProvider>
    </div>
  );
}
