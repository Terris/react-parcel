import React from "react";
import DOMPurify from "dompurify";
import { defaultSanitizerConfig } from "../sanitizer/defaultSanitizerConfig";
interface ParcelReaderProps {
  document: string;
  className?: string;
  sanitizeOptions?: DOMPurify.Config;
}

export function ParcelReader({
  document,
  className,
  sanitizeOptions,
}: ParcelReaderProps) {
  const defaultSanitizeOptions = defaultSanitizerConfig;
  // Sanitize the HTML content to prevent XSS attacks
  const sanitizedHtml = DOMPurify.sanitize(
    document,
    sanitizeOptions ?? defaultSanitizeOptions
  );

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
