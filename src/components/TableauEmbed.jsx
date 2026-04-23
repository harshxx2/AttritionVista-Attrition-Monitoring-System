import React, { useState, useEffect } from 'react';
import { Loader2, Maximize2, Download } from 'lucide-react';

export default function TableauEmbed({ url, title }) {
  const [isLoading, setIsLoading] = useState(true);

  // Fake network delay for preview when URL is blank
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <div className="relative w-full h-[550px] bg-[#0A0D18]/50 border border-white/5 rounded-2xl overflow-hidden group">
      {/* Top Action Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/80 to-transparent z-20 flex justify-between items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-medium text-sm drop-shadow-md tracking-wide">{title || 'Tableau Visualization'}</span>
        <div className="flex gap-2">
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm text-white transition-colors" title="Export PDF">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm text-white transition-colors" title="Full Screen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl transition-all duration-500">
          <Loader2 className="w-10 h-10 text-accent animate-spin mb-4 drop-shadow-[0_0_10px_rgba(79,127,255,0.8)]" />
          <span className="text-accent font-mono text-sm tracking-widest animate-pulse">CONNECTING TO MODEL SERVER...</span>
        </div>
      )}

      {url ? (
        <iframe 
          src={url}
          className="w-full h-full border-0 relative z-0"
          title="Tableau Dashboard"
          onLoad={() => setIsLoading(false)}
        />
      ) : (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl m-6 bg-white/[0.01]">
          <div className="p-4 bg-accent/10 rounded-full mb-3">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-accent to-violet opacity-80" />
          </div>
          <div className="text-gray-400 font-mono text-[11px] mb-1 text-center tracking-widest">TABLEAU MOUNT POINT</div>
          <div className="text-gray-500 text-[13px]">Pass a public URL to embed visualization here</div>
        </div>
      )}
    </div>
  );
}
