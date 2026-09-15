import React from 'react';
import { PenTool, Users, ShieldCheck, Archive, ExternalLink } from 'lucide-react';

export const QuickNav: React.FC = () => {
  const handleOpenSeparateArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/archive.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="bg-[#fffdf9] border-b border-[#dfc7b2] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Journal Quick Navigation" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
          
          <a
            href="#author-guidelines"
            className="flex items-center justify-center gap-2 p-3 bg-[#fffaf4] hover:bg-[#f1e1d1] border border-[#dfc7b2] rounded-xl text-xs sm:text-sm font-bold text-[#513326] transition-colors shadow-2xs"
          >
            <PenTool className="w-4 h-4 text-[#8a5a41]" />
            <span>Author Guidelines</span>
          </a>

          <a
            href="#editorial-board"
            className="flex items-center justify-center gap-2 p-3 bg-[#fffaf4] hover:bg-[#f1e1d1] border border-[#dfc7b2] rounded-xl text-xs sm:text-sm font-bold text-[#513326] transition-colors shadow-2xs"
          >
            <Users className="w-4 h-4 text-[#8a5a41]" />
            <span>Editorial Board</span>
          </a>

          <a
            href="#policies"
            className="flex items-center justify-center gap-2 p-3 bg-[#fffaf4] hover:bg-[#f1e1d1] border border-[#dfc7b2] rounded-xl text-xs sm:text-sm font-bold text-[#513326] transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#8a5a41]" />
            <span>Publication Policies</span>
          </a>

          <a
            href="/archive.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenSeparateArchive}
            className="flex items-center justify-center gap-2 p-3 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] border border-[#2f1d16] rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-2xs group"
            title="Open Archives & Publications in a separate tab"
          >
            <Archive className="w-4 h-4 text-[#c69470]" />
            <span>Archives & Publications</span>
            <ExternalLink className="w-3 h-3 text-[#c69470] group-hover:translate-x-0.5 transition-transform" />
          </a>

        </nav>
      </div>
    </section>
  );
};
