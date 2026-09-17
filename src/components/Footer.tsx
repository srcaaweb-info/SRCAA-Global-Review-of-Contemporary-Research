import React from 'react';
import { BookOpen, ShieldCheck, Mail, ArrowUp, ExternalLink, Archive, Inbox } from 'lucide-react';

interface FooterProps {
  onOpenSubmissionsLog?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSubmissionsLog }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticleArchive = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('/archive.html', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#231510] text-[#f4e5d7] border-t border-[#3d271e]">
      {/* Upper Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Emblem & Publisher */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden p-0.5 bg-[#fffaf4] ring-2 ring-[#c69470] shrink-0">
                <img 
                  src="/logo.svg" 
                  alt="SRCAA bird and open book emblem" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#fffaf4] tracking-wide block leading-tight">
                  SRCAA
                </span>
                <span className="text-xs text-[#c69470] tracking-widest uppercase">
                  Global Review
                </span>
              </div>
            </div>

            <p className="text-xs text-[#dfc7b2] leading-relaxed">
              <strong>Shakti Research Centre and Academia (SRCAA)</strong>. Digital academic and research institution established in 2024, accredited under the International Trade Council (ITC) Framework.
            </p>

            <div className="pt-2 text-xs text-[#c69470]">
              <span className="block font-semibold text-[#fffaf4]">Publisher Registered Office:</span>
              <span>Yelahanka, Bengaluru, Karnataka, India</span>
            </div>
          </div>

          {/* Col 2: Journal Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#fffaf4] mb-3 pb-1 border-b border-[#3d271e]">
              Journal Sections
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#about" className="hover:text-[#fffaf4] transition-colors">
                  About SGRCR
                </a>
              </li>
              <li>
                <a href="#journal-metadata" className="hover:text-[#fffaf4] transition-colors">
                  Scope & Covered Disciplines
                </a>
              </li>
              <li>
                <a href="#editorial-board" className="hover:text-[#fffaf4] transition-colors">
                  Editorial Board & Our Editors
                </a>
              </li>
              <li>
                <a href="#author-guidelines" className="hover:text-[#fffaf4] transition-colors">
                  Author Guidelines & Manuscript Submission
                </a>
              </li>
              <li>
                <a href="#archives" className="hover:text-[#fffaf4] transition-colors">
                  Archives (Volume 1 · Issue 1)
                </a>
              </li>
              <li>
                {/* Highlighted Link for Archives & Publications in Separate Tab */}
                <a 
                  href="/archive.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={handleOpenArticleArchive}
                  className="text-[#e6bd94] font-bold hover:underline inline-flex items-center gap-1.5"
                >
                  <Archive className="w-3.5 h-3.5 text-[#c69470]" />
                  <span>Archives & Publications (Separate Tab)</span>
                  <ExternalLink className="w-3 h-3 text-[#c69470]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Policies */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#fffaf4] mb-3 pb-1 border-b border-[#3d271e]">
              Statutory Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#editorial-guidelines" className="hover:text-[#fffaf4] transition-colors">
                  Policy 1 · Editorial Guidelines
                </a>
              </li>
              <li>
                <a href="#reviewer-guidelines" className="hover:text-[#fffaf4] transition-colors">
                  Policy 2 · Reviewer Guidelines
                </a>
              </li>
              <li>
                <a href="#plagiarism-guidelines" className="hover:text-[#fffaf4] transition-colors">
                  Policy 3 · Plagiarism & AI Guidelines
                </a>
              </li>
              <li>
                <a href="#withdrawal-policy" className="hover:text-[#fffaf4] transition-colors">
                  Policy 5 · Withdrawal & Retraction Policy
                </a>
              </li>
              <li>
                <a href="#legal-policy" className="hover:text-[#fffaf4] transition-colors">
                  Policy 6 · Legal & Licensing (CC BY 4.0)
                </a>
              </li>
              <li>
                <a href="#academic-publication-policy" className="hover:text-[#fffaf4] transition-colors">
                  Policy 7 · Academic & Publication Policy
                </a>
              </li>
              <li>
                <a href="#issn-compliance" className="hover:text-[#fffaf4] transition-colors">
                  ISSN India Particulars & Frequency
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Indexing Roadmaps */}
          <div>
            <h4 className="font-serif font-bold text-base text-[#fffaf4] mb-3 pb-1 border-b border-[#3d271e]">
              Editorial Contact
            </h4>
            <div className="space-y-2 text-xs text-[#dfc7b2]">
              <p>
                <strong className="text-[#fffaf4] block">Form Dispatch Target:</strong>
                <a href="mailto:srcaaweb@gmail.com" className="text-[#e6bd94] font-bold hover:underline">
                  srcaaweb@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-[#fffaf4] block">Manuscript Inquiries:</strong>
                <a href="mailto:admin@srcaa.co.in" className="text-[#c69470] hover:underline">
                  admin@srcaa.co.in
                </a>
              </p>
              <p>
                <strong className="text-[#fffaf4] block">General Secretariat:</strong>
                <a href="mailto:srcaacontact@gmail.com" className="text-[#c69470] hover:underline">
                  srcaacontact@gmail.com
                </a>
              </p>

              {onOpenSubmissionsLog && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onOpenSubmissionsLog}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2f1d16] hover:bg-[#513326] text-[#e6bd94] border border-[#8a5a41] rounded-lg text-xs font-bold transition-colors"
                  >
                    <Inbox className="w-3.5 h-3.5 text-[#c69470]" />
                    <span>Editorial Submissions Log</span>
                  </button>
                </div>
              )}

              <div className="pt-2 border-t border-[#3d271e] text-[11px] text-[#dfc7b2]">
                <p>Open Access: CC BY 4.0</p>
                <p>DOAJ & Scopus Indexation Framework</p>
                <p>Bengaluru Jurisdiction, India</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3d271e] bg-[#1a0f0b] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#dfc7b2]">
          <p className="text-center sm:text-left">
            © 2026 SRCAA — Shakti Research Centre and Academia. All rights reserved. Open-Access Academic Repository.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-xs text-[#e6bd94] hover:text-[#fffaf4] transition-colors p-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
