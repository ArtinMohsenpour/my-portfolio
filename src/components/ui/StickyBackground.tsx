"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function StickyBackground() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="bg-sticky-container">
      {/* 1. Low Quality Layer: Pure CSS Glow (Visible immediately) */}
      <div className="bg-low-quality" />

      {/* 2. High Quality Layer: Optimized Next.js Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }} // Keep it subtle for "Glass" effect
        transition={{ duration: 1.5 }}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src="/bg1.jpg" // Your image in public folder
          alt="Background Atmosphere"
          fill
          priority // Ensures it starts loading immediately
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          quality={100}
        />
      </motion.div>
    </div>
  );
}
