"use client";

import { Zap, Shield, Target, Flame, Skull } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-800/50 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/3 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/3 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-xs font-mono tracking-wider uppercase">Premium Checker Suite</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-6 animate-slide-up">
            <span className="text-red-500">Tool</span><span className="text-white">Hub</span>
            <br />
            <span className="text-red-500">Precision</span><span className="text-white"> Arsenal</span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 mb-8 max-w-xl leading-relaxed animate-slide-up" style={{animationDelay: '100ms'}}>
            Elite checker suite for professionals. Crypto-only payments. Instant delivery.
            Zero KYC. Maximum anonymity.
          </p>

          <div className="flex flex-wrap gap-4 mb-10 animate-slide-up" style={{animationDelay: '200ms'}}>
            <a href="/shop" className="btn-primary group inline-flex items-center gap-2">
              <span>Enter the Vault</span>
              <span className="transition-transform group-hover:rotate-12">→</span>
            </a>
            <a href="/shop" className="btn-secondary">
              Browse Tools
            </a>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-zinc-500 animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="flex items-center gap-2"><span className="w-5 h-5 text-red-500/80">🔒</span> <span>Zero KYC</span></div>
            <div className="flex items-center gap-2"><span className="w-5 h-5 text-red-500/80">₿</span> <span>Crypto Only</span></div>
            <div className="flex items-center gap-2"><span className="w-5 h-5 text-red-500/80">⚡</span> <span>Instant Delivery</span></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}