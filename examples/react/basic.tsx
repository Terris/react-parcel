import React from "react";
import {
  Parcel,
  ParcelReader,
  ParcelProvider,
  defaultSanitizerConfig,
} from "../../src";

const API_KEY = "your-api-key";

// Example 1: Using Parcel directly with an API key
export function BasicExample() {
  return (
    <div className="example">
      <h2>Basic Example</h2>

      <Parcel apiKey={API_KEY} parcelKey="example-parcel">
        {({ name, description, document }) => (
          <div className="parcel-container">
            <h3>{name}</h3>
            <p className="description">{description}</p>
            <div className="document-container">
              <ParcelReader
                document={document}
                sanitizeOptions={{
                  ALLOWED_TAGS: [
                    "p",
                    "h1",
                    "h2",
                    "h3",
                    "strong",
                    "em",
                    "ul",
                    "ol",
                    "li",
                    "a",
                  ],
                  ALLOWED_ATTR: ["href", "target", "rel"],
                }}
              />
            </div>
          </div>
        )}
      </Parcel>
    </div>
  );
}

// Example 2: Using ParcelProvider for shared API key
export function ProviderExample() {
  return (
    <div className="example">
      <h2>Provider Example</h2>

      <ParcelProvider apiKey={API_KEY}>
        <div className="parcels-grid">
          <Parcel parcelKey="example-parcel-1">
            {({ name, description, document }) => (
              <div className="parcel-item">
                <h3>{name}</h3>
                <p>{description}</p>
                <ParcelReader
                  document={document}
                  sanitizeOptions={defaultSanitizerConfig}
                />
              </div>
            )}
          </Parcel>

          <Parcel parcelKey="example-parcel-2">
            {({ name, description, document }) => (
              <div className="parcel-item">
                <h3>{name}</h3>
                <p>{description}</p>
                <ParcelReader
                  document={document}
                  sanitizeOptions={defaultSanitizerConfig}
                />
              </div>
            )}
          </Parcel>
        </div>
      </ParcelProvider>
    </div>
  );
}
