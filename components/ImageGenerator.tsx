"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Enumerates the two supported image source types.
 * – URL    → remote image served over HTTP(S)
 * – PUBLIC → file that lives in Next.js `/public` (or any absolute path your server can serve)
 */
export enum ImageSourceType {
  URL = "url",
  PUBLIC = "public",
}

/**
 * Props for the <ImageGenerator /> component.
 *
 * @property path       - Full https URL or path relative to `/public` (e.g. "/logo.png").
 * @property sourceType - Indicates whether the path is a remote URL or a public‑folder asset.
 * @property alt        - Optional alt text for accessibility.
 * @property className  - Optional Tailwind classes for custom styling.
 */
export interface ImageGeneratorProps {
  path: string;
  sourceType: ImageSourceType;
  alt?: string;
  className?: string;
}

/**
 * Displays an image with a small fade‑in animation. Works in **Next.js** App Router
 * because it keeps everything on the client side (`"use client"`).
 *
 * – Remote URLs are passed through untouched.
 * – Local assets must live in `/public` or be given as an absolute `/` path.
 */
const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  path,
  sourceType,
  alt = "",
  className = "",
}) => {
  // Derive the correct src value.
  const src =
    sourceType === ImageSourceType.PUBLIC
      ? path.startsWith("/")
        ? path // already absolute inside /public
        : `/${path}` // make sure we have the leading slash
      : path; // external URL

  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl shadow ${className}`}
    />
  );
};

export default ImageGenerator;
