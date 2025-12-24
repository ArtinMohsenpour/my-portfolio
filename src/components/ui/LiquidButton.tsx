// src/components/ui/LiquidButton.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface LiquidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  download?: boolean;
  className?: string;
}

export const LiquidButton = ({
  children,
  onClick,
  href,
  download,
  className,
}: LiquidButtonProps) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-6 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg
        transition-all duration-200 hover:bg-white/20 hover:border-white/30
        ${className}
      `}
    >
      <span className="relative z-10 text-sm font-medium tracking-wide">
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} download={download} target={download ? "_blank" : "_self"}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick}>
      {content}
    </button>
  );
};
