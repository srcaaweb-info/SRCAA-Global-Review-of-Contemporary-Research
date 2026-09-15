import React from 'react';
import { Smartphone, Laptop, Monitor, Maximize2, X } from 'lucide-react';

export type ViewportMode = 'full' | 'lab' | 'laptop' | 'mobile';

interface ResponsiveBarProps {
  currentMode: ViewportMode;
  onModeChange: (mode: ViewportMode) => void;
  isVisible: boolean;
  onToggleVisible: () => void;
}

export const ResponsiveBar: React.FC<ResponsiveBarProps> = ({
  currentMode,
  onModeChange,
  isVisible,
  onToggleVisible,
}) => {
  if (!isVisible) {
    return (
      <button
        type="button"
        onClick={onToggleVisible}
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-[#2f1d16] text-[#fffaf4] text-xs font-bold rounded-full shadow-lg border border-[#c69470] flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
        title="Show Responsive Viewport Controls (Mobile, Laptop, Lab)"
      >
        <Monitor className="w-3.5 h-3.5 text-[#c69470]" />
        <span>Responsive Mode</span>
      </button>
    );
  }

  return (
    <aside aria-label="Responsive Viewport Selector" className="fixed bottom-4 right-4 z-50 bg-[#2f1d16]/95 backdrop-blur-md text-[#fffaf4] px-3.5 py-2 rounded-2xl shadow-2xl border border-[#c69470]/60 flex items-center gap-2 sm:gap-3 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-1.5 text-[#e6bd94] font-bold border-r border-[#513326] pr-2">
        <span className="text-[11px] uppercase tracking-wider hidden sm:inline">Viewport:</span>
      </div>

      {/* Mobile (380px) */}
      <button
        type="button"
        onClick={() => onModeChange('mobile')}
        className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
          currentMode === 'mobile'
            ? 'bg-[#c69470] text-[#2f1d16] shadow-xs'
            : 'text-[#dfc7b2] hover:text-[#fffaf4] hover:bg-white/10'
        }`}
        title="Preview Mobile Screen (390px)"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>Mobile</span>
      </button>

      {/* Laptop (1024px) */}
      <button
        type="button"
        onClick={() => onModeChange('laptop')}
        className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
          currentMode === 'laptop'
            ? 'bg-[#c69470] text-[#2f1d16] shadow-xs'
            : 'text-[#dfc7b2] hover:text-[#fffaf4] hover:bg-white/10'
        }`}
        title="Preview Laptop Screen (1024px)"
      >
        <Laptop className="w-3.5 h-3.5" />
        <span>Laptop</span>
      </button>

      {/* Lab / Widescreen (1440px) */}
      <button
        type="button"
        onClick={() => onModeChange('lab')}
        className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
          currentMode === 'lab'
            ? 'bg-[#c69470] text-[#2f1d16] shadow-xs'
            : 'text-[#dfc7b2] hover:text-[#fffaf4] hover:bg-white/10'
        }`}
        title="Preview Lab / Large Widescreen (1440px)"
      >
        <Monitor className="w-3.5 h-3.5" />
        <span>Lab</span>
      </button>

      {/* Full Fluid */}
      <button
        type="button"
        onClick={() => onModeChange('full')}
        className={`px-2 py-1 rounded-lg font-bold flex items-center gap-1 transition-all ${
          currentMode === 'full'
            ? 'bg-[#c69470] text-[#2f1d16] shadow-xs'
            : 'text-[#dfc7b2] hover:text-[#fffaf4] hover:bg-white/10'
        }`}
        title="Full Screen / Fluid width"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Auto</span>
      </button>

      {/* Close */}
      <button
        type="button"
        onClick={onToggleVisible}
        className="p-1 rounded-md text-[#dfc7b2] hover:text-[#fffaf4] hover:bg-white/10 transition-colors ml-1"
        aria-label="Hide Viewport Selector"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};
