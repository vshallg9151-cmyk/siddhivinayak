import React from 'react';

export default function BackgroundWrapper({ children, imageUrl }) {
  const bgImage = imageUrl || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=2000&q=90";

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      
      {/* Background Image Container matching Home Hero */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt="Cinematic Highway Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 contrast-105 transition-all duration-1000"
        />
        {/* Dark Slate Gradients matching Home Hero */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/60" />
      </div>

      {/* Floating Ambient Glowing Orbs */}
      <div className="fixed top-1/4 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none z-0" />

      {/* Page Content Container - Transparent so background is crisp and visible */}
      <div className="relative z-10 bg-transparent">
        {children}
      </div>

    </div>
  );
}
