// src/components/ui/LiquidButton.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-6 py-2 content-center justify-center text-center rounded-xl text-white/50 font-bold transition-all duration-200 min-h-10 max-h-12
        /* Glass Effect */
      /* 1. Base Glass & linear */
    bg-linear-to-b from-white/15 to-white/5
    backdrop-blur-md
    
    /* 2. Border */
    border border-white/10
    
    /* 4. The "Liquid" Shadows (Rim light top, Depth bottom, Drop shadow) */
    shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3),inset_0_-1px_0_0_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.1)]
    
    /* --- HOVER STATES --- */
    hover:bg-linear-to-b hover:from-white/25 hover:to-white/10
    hover:border-white/20
    hover:text-white
    /* Brighten rim light and increase outer glow on hover */
    hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),inset_0_-1px_0_0_rgba(0,0,0,0.2),0_10px_25px_-5px_rgba(0,0,0,0.2)]
    /* Subtle lift effect */
        ${className}
      `}
    >
      <span className="relative align-middle justify-center text-center  z-10 text-sm tracking-wide">
        {children}
      </span>
    </motion.div>
  );
  if (href) {
    // Use a standard <a> tag for downloads
    if (download) {
      return (
        <Link href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </Link>
      );
    }

    // Use Next.js Link for standard internal navigation
    return (
      <Link href={href} className="cursor-pointer">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      {content}
    </button>
  );
};