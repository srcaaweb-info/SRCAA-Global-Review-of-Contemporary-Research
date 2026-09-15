import React, { useState } from 'react';
import { 
  BookOpen, 
  Users, 
  PenTool, 
  ShieldCheck, 
  BadgeCheck, 
  Archive, 
  Mail, 
  Menu, 
  X, 
  ExternalLink,
  Info
} from 'lucide-react';

interface NavbarProps {
  onOpenArchives?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenArchives }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleArchivesClick = (e: React.MouseEvent) => {
    // Open Archives & Publications directly in a separate browser tab
    window.open('/archive.html', '_blank', 'noopener,noreferrer');
    if (onOpenArchives) {
      onOpenArchives();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fffaf4]/95 backdrop-blur-md border-b border-[#dfc7b2] transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Emblem */}
          <a 
            href="#top" 
            className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#c69470] rounded-lg p-1 transition-transform"
            aria-label="SGRCR Home"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-0.5 bg-[#fffaf4] ring-2 ring-[#c69470] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-200">
              <img 
                src="/logo.svg" 
                alt="SRCAA bird and open book emblem" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-lg tracking-wider text-[#2f1d16] leading-tight">
                SRCAA
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#8a5a41] uppercase">
                Global Review (SGRCR)
              </span>
            </div>
          </a>

          {/* Desktop Navigation (Laptop & Lab / Widescreen) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            <a 
              href="#about" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-[#8a5a41]" />
              About
            </a>
            <a 
              href="#journal-metadata" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8a5a41]" />
              Scope
            </a>
            <a 
              href="#author-guidelines" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <PenTool className="w-3.5 h-3.5 text-[#8a5a41]" />
              Submit
            </a>
            <a 
              href="#editorial-board" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#8a5a41]" />
              Editorial Board
            </a>
            <a 
              href="#policies" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8a5a41]" />
              Policies
            </a>
            <a 
              href="#issn-compliance" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <BadgeCheck className="w-3.5 h-3.5 text-[#8a5a41]" />
              ISSN
            </a>
            <a 
              href="#editorial-office" 
              className="px-2.5 py-1.5 text-xs xl:text-sm font-semibold text-[#513326] hover:text-[#2f1d16] hover:bg-[#f1e1d1]/50 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#8a5a41]" />
              Contact
            </a>

            {/* Direct Separate Tab Action for Archives & Publications */}
            <div className="pl-2 border-l border-[#dfc7b2] flex items-center">
              <a
                href="/archive.html"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleArchivesClick}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#2f1d16] text-[#fffaf4] hover:bg-[#513326] text-xs xl:text-sm font-bold rounded-full shadow-xs transition-all transform hover:-translate-y-0.5 border border-[#8a5a41]"
                title="Open Archives & Publications in a separate tab"
              >
                <Archive className="w-3.5 h-3.5 text-[#c69470]" />
                <span>Archives & Publications</span>
                <ExternalLink className="w-3 h-3 text-[#c69470]" />
              </a>
            </div>
          </nav>

          {/* Right Mobile Actions & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="/archive.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleArchivesClick}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#2f1d16] text-[#fffaf4] text-xs font-bold rounded-full shadow-xs"
              title="Archives & Publications in separate tab"
            >
              <Archive className="w-3 h-3 text-[#c69470]" />
              <span className="hidden sm:inline">Archives & Publications</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#c69470]" />
            </a>

            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-[#2f1d16] hover:bg-[#f1e1d1] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#c69470]"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-menu"
          className="lg:hidden bg-[#fffaf4] border-t border-[#dfc7b2] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="p-2 mb-2 bg-[#fdf6ee] rounded-lg border border-[#dfc7b2]">
            <p className="text-xs font-bold text-[#8a5a41] uppercase tracking-wider mb-1">
              Direct Publication Access
            </p>
            <a
              href="/archive.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                closeMobileMenu();
                window.open('/archive.html', '_blank', 'noopener,noreferrer');
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#2f1d16] text-[#fffaf4] font-bold text-sm rounded-md shadow-xs"
            >
              <span className="flex items-center gap-2">
                <Archive className="w-4 h-4 text-[#c69470]" />
                Archives & Publications
              </span>
              <span className="flex items-center gap-1 text-xs text-[#c69470]">
                Separate Tab <ExternalLink className="w-3 h-3" />
              </span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <a 
              href="#about" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <Info className="w-4 h-4 text-[#8a5a41]" />
              About the Journal
            </a>
            <a 
              href="#journal-metadata" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <BookOpen className="w-4 h-4 text-[#8a5a41]" />
              Journal Metadata & Domains
            </a>
            <a 
              href="#author-guidelines" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <PenTool className="w-4 h-4 text-[#8a5a41]" />
              Submission & Author Guidelines
            </a>
            <a 
              href="#editorial-board" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <Users className="w-4 h-4 text-[#8a5a41]" />
              Editorial Board & Editors
            </a>
            <a 
              href="#policies" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <ShieldCheck className="w-4 h-4 text-[#8a5a41]" />
              Publication Policies (1–7)
            </a>
            <a 
              href="#issn-compliance" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <BadgeCheck className="w-4 h-4 text-[#8a5a41]" />
              ISSN India Compliance
            </a>
            <a 
              href="/archive.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                closeMobileMenu();
                window.open('/archive.html', '_blank', 'noopener,noreferrer');
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <span className="flex items-center gap-3">
                <Archive className="w-4 h-4 text-[#8a5a41]" />
                Archives & Publications
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8a5a41]" />
            </a>
            <a 
              href="#editorial-office" 
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-[#513326] hover:bg-[#f1e1d1] active:bg-[#dfc7b2]"
            >
              <Mail className="w-4 h-4 text-[#8a5a41]" />
              Contact & Editorial Office
            </a>
          </div>

          <div className="pt-3 border-t border-[#dfc7b2] flex flex-col gap-2">
            <a
              href="#author-guidelines"
              onClick={closeMobileMenu}
              className="w-full text-center py-2.5 bg-[#8a5a41] text-[#fffaf4] font-bold text-sm rounded-md shadow-xs hover:bg-[#513326]"
            >
              Submit Manuscript
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
