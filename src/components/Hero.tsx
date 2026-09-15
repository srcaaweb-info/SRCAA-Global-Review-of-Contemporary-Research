import React from 'react';
import { 
  Archive, 
  PenTool, 
  ExternalLink, 
  CheckCircle2, 
  Award, 
  Globe2, 
  FileText 
} from 'lucide-react';

export const Hero: React.FC = () => {
  const handleOpenSeparateArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/archive.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#231510] via-[#3a2217] to-[#513326] text-[#fffaf4] py-12 sm:py-16 md:py-20 lg:py-24 border-b border-[#dfc7b2]">
      {/* Subtle academic background grid & ambient light */}
      <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#c69470]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#8a5a41]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Emblem */}
        <div className="inline-flex flex-col items-center mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full p-1.5 bg-[#fffaf4] ring-4 ring-[#c69470]/80 shadow-2xl transition-transform hover:scale-105 duration-300">
            <img 
              src="/logo.svg" 
              alt="SRCAA bird and open book emblem" 
              className="w-full h-full object-contain"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 mt-4 px-3.5 py-1 rounded-full bg-[#c69470]/20 border border-[#c69470]/40 text-[#e6bd94] text-xs sm:text-sm font-bold tracking-widest uppercase shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#e6bd94]" />
            Peer-Reviewed International Academic Journal
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#fffaf4] max-w-5xl mx-auto leading-tight tracking-tight drop-shadow-xs">
          SRCAA Global Review of Contemporary Research
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base font-semibold tracking-widest uppercase text-[#e6bd94]">
          (SGRCR) · Shakti Research Centre & Academia · Est. 2024
        </p>

        {/* Description */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[#f4e5d7] max-w-3xl mx-auto font-normal leading-relaxed">
          An open-access, double-blind, multidisciplinary peer-reviewed journal publishing original research across Commerce, Management, Economics, Social Sciences, Technology, and Interdisciplinary Fields with Crossref DOI assignment.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto">
          
          {/* Option: Archives & Publications in Separate Tab */}
          <a
            href="/archive.html"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleOpenSeparateArchive}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#c69470] hover:bg-[#d9a985] text-[#2f1d16] font-bold text-sm sm:text-base rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-[#e6bd94]"
          >
            <Archive className="w-4 h-4 text-[#2f1d16]" />
            <span>Archives & Publications</span>
            <span className="bg-[#2f1d16]/15 text-[#2f1d16] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 font-extrabold">
              Separate Tab <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </a>

          {/* Section Jump to Archives */}
          <a
            href="#archives"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#2f1d16]/80 hover:bg-[#2f1d16] text-[#fffaf4] font-bold text-sm sm:text-base rounded-full border border-[#c69470]/60 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4 text-[#c69470]" />
            <span>Volume 1 Overview</span>
          </a>

          {/* Submit Manuscript */}
          <a
            href="#author-guidelines"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8a5a41] hover:bg-[#724832] text-[#fffaf4] font-bold text-sm sm:text-base rounded-full border border-[#c69470]/30 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <PenTool className="w-4 h-4 text-[#e6bd94]" />
            <span>Submit Manuscript</span>
          </a>
        </div>

        {/* Feature Badges / Highlights */}
        <div className="mt-10 pt-8 border-t border-[#dfc7b2]/20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-left max-w-4xl mx-auto">
          <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-[#c69470] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#fffaf4]">Open Access</p>
              <p className="text-[11px] text-[#dfc7b2]">CC BY 4.0 International</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-[#c69470] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#fffaf4]">Double-Blind Review</p>
              <p className="text-[11px] text-[#dfc7b2]">2+ Independent Referees</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/10">
            <Globe2 className="w-5 h-5 text-[#c69470] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#fffaf4]">Bi-Annual Schedule</p>
              <p className="text-[11px] text-[#dfc7b2]">ISSN India Compliance</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 bg-white/5 p-3 rounded-lg border border-white/10">
            <Award className="w-5 h-5 text-[#c69470] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#fffaf4]">COPE & DORA</p>
              <p className="text-[11px] text-[#dfc7b2]">Scopus CSAB Criteria</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
