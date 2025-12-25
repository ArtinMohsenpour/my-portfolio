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
        relative px-6 py-2 content-center justify-center text-center rounded-xl text-white/50 font-bold transition-all duration-200 min-h-11 max-h-12
        /* Glass Effect */
       backdrop-blur-[5px]
        border border-gray-900/30
        
        /* Inset "Liquid" Highlights */
        before:content-[''] before:absolute before:inset-0 before:rounded-xl
        before:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]
        
        hover:bg-white/10 hover:border-gray-900/30 hover:text-white hover:shadow-md
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