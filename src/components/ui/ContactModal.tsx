"use client";

import { useState, useEffect } from "react";
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  socialLinks?: Array<{ platform: string; url: string }>;
}

export default function ContactModal({
  isOpen,
  onClose,
  email = "hello@example.com",
  socialLinks = [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ],
}: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("git")) return <Github size={18} />;
    if (p.includes("linked")) return <Linkedin size={18} />;
    if (p.includes("twitter") || p.includes("x")) return <Twitter size={18} />;
    return <Globe size={18} />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-120 flex items-center justify-center px-4 sm:px-6">
      {/* 1. Static Backdrop (Click to close) */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 md:bg-black/60"
      />

      {/* 2. Modal Container - Uses standard CSS animation class */}
      <div className="relative w-full max-w-4xl bg-black md:bg-[#0a0a0a] border border-white/30 md:border-white/10 rounded-2xl shadow-2xl shadow-white/15 md:shadow-none overflow-hidden flex flex-col md:flex-row animate-slide-up">
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-blue-500/70 to-transparent" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {/* --- LEFT COLUMN: FORM --- */}
        <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-white/5 bg-linear-to-b from-white/2 to-transparent">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Let&apos;s Connect
            </h2>
            <p className="text-white/50 text-sm mt-1">
              Send me a message directly.
            </p>
          </div>

          {status === "success" ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-white/40 font-bold">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors resize-none text-sm"
                  placeholder="How can I help you?"
                />
              </div>

              <button
                disabled={status === "loading"}
                className="w-full bg-white/95 text-black font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors disabled:opacity-50 mt-2 text-sm"
              >
                {status === "loading" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
                  </>
                )}
              </button>

              {status === "error" && (
                <p className="text-red-400 text-xs text-center">
                  Failed to send. Please try again.
                </p>
              )}
            </form>
          )}
        </div>

        {/* --- RIGHT COLUMN: INFO --- */}
        <div className="md:w-80 bg-white/3 sm:p-6 px-5 pt-1 md:p-10 flex flex-col justify-center border-t md:border-t-0 border-white/5">
          <div className="md:space-y-8 space-y-2">
            {/* Contact Email */}
            <div>
              <h3 className="text-[10px] uppercase tracking-wider text-white/40 font-bold md:mb-3">
                Contact Info
              </h3>
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors p-2 -mx-2 rounded-lg hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10">
                  <Mail size={16} />
                </div>
                <span className="text-sm font-medium truncate">{email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hidden sm:flex sm:flex-col">
              <h3 className="text-[10px] uppercase tracking-wider text-white/40 font-bold mb-3">
                Socials
              </h3>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors p-2 -mx-2 rounded-lg hover:bg-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20">
                      {getIcon(link.platform)}
                    </div>
                    <div className="flex-1 flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {link.platform}
                      </span>
                      <ExternalLink
                        size={12}
                        className="opacity-0 group-hover:opacity-50 transition-opacity"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
