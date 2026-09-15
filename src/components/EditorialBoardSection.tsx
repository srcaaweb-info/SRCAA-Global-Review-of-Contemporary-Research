import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Mail, 
  Globe2, 
  Scale, 
  Laptop, 
  BookOpen, 
  ShieldCheck, 
  Search
} from 'lucide-react';
import { EDITORIAL_MEMBERS } from '../data/journalData';
import { EditorialMember } from '../types';

export const EditorialBoardSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMembers = EDITORIAL_MEMBERS.filter((member) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'leadership' && (member.category === 'leadership' || member.category === 'chief_editor')) ||
      (selectedCategory === 'advisory' && member.category === 'advisory') ||
      (selectedCategory === 'members' && member.category === 'member') ||
      (selectedCategory === 'specialists' && member.category === 'specialist');

    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.degrees && member.degrees.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getRoleIcon = (member: EditorialMember) => {
    switch (member.category) {
      case 'leadership':
        return <ShieldCheck className="w-4 h-4 text-[#8a5a41]" />;
      case 'chief_editor':
        return <Award className="w-4 h-4 text-[#8a5a41]" />;
      case 'advisory':
        return <Globe2 className="w-4 h-4 text-[#8a5a41]" />;
      case 'specialist':
        return member.role.toLowerCase().includes('legal') ? (
          <Scale className="w-4 h-4 text-[#8a5a41]" />
        ) : (
          <Laptop className="w-4 h-4 text-[#8a5a41]" />
        );
      default:
        return <BookOpen className="w-4 h-4 text-[#8a5a41]" />;
    }
  };

  return (
    <section id="editorial-board" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fffdf9] border-b border-[#dfc7b2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e1d1] text-[#8a5a41] text-xs font-bold uppercase tracking-widest">
              <Users className="w-3.5 h-3.5" />
              Governance & Peer Leadership
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#2f1d16] mt-3">
              Editorial Board & Our Editors
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#684f43] max-w-2xl">
              Distinguished researchers, academic administrators, and institutional scholars leading the editorial policy, double-blind review integrity, and indexing standards of SGRCR.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8a5a41] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search editors by name or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-[#fffaf4] border border-[#dfc7b2] rounded-full text-[#2f1d16] focus:outline-hidden focus:ring-2 focus:ring-[#8a5a41] transition-all"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#dfc7b2] pb-4">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            All Members ({EDITORIAL_MEMBERS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('leadership')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'leadership'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            Leadership & Editors-in-Chief
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('advisory')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'advisory'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            International Advisory
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('members')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'members'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            Associate Researchers & Board
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('specialists')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'specialists'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            Legal & Technical Officers
          </button>
        </div>

        {/* Member Cards Grid - Fully Responsive across Mobile, Laptop, and Lab (Large Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredMembers.map((member) => (
            <article
              key={member.id}
              className="flex flex-col justify-between bg-[#fffaf4] border border-[#dfc7b2] rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div>
                {/* Header with Avatar & Category Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#2f1d16] text-[#fffaf4] font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-xs ring-2 ring-[#c69470]/60 group-hover:ring-[#8a5a41] transition-all">
                    {member.initials}
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#fdf6ee] border border-[#dfc7b2] text-[11px] font-semibold text-[#8a5a41]">
                    {getRoleIcon(member)}
                    {member.category === 'chief_editor' ? 'Chief Editor' : member.category === 'advisory' ? 'International' : member.category === 'specialist' ? 'Advisory' : 'Board'}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2f1d16] leading-snug">
                  {member.name}
                </h3>

                {/* Role Designation */}
                <p className="text-xs sm:text-sm font-bold text-[#8a5a41] mt-1 mb-2 leading-relaxed">
                  {member.role}
                </p>

                {/* Qualifications / Degrees Chip (if present) */}
                {member.degrees && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f1e1d1]/50 border border-[#dfc7b2] rounded-md text-xs font-semibold text-[#513326] mb-3">
                    <GraduationCap className="w-3.5 h-3.5 text-[#8a5a41] shrink-0" />
                    <span>{member.degrees}</span>
                  </div>
                )}

                {/* Affiliations & Sub-affiliations with Icons */}
                <div className="space-y-2 mt-2 pt-2 border-t border-[#dfc7b2]/60 text-xs sm:text-sm text-[#513326]">
                  <div className="flex items-start gap-2">
                    <Building2 className="w-4 h-4 text-[#8a5a41] shrink-0 mt-0.5" />
                    <p className="leading-snug">
                      <strong>Affiliation:</strong> {member.affiliation}
                    </p>
                  </div>

                  {member.subAffiliation && (
                    <div className="flex items-start gap-2 text-xs text-[#684f43]">
                      <BookOpen className="w-3.5 h-3.5 text-[#c69470] shrink-0 mt-0.5" />
                      <p className="leading-snug">{member.subAffiliation}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1 text-xs text-[#8a5a41] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8a5a41] shrink-0" />
                    <span>{member.location}</span>
                  </div>
                </div>

                {/* Research Focus tags (if available) */}
                {member.researchFocus && (
                  <div className="mt-4 pt-3 border-t border-[#dfc7b2]/40">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a5a41] mb-1.5">
                      Domain Focus:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {member.researchFocus.map((focus, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-[#fdf6ee] text-[#684f43] rounded-sm text-[10px] border border-[#dfc7b2]/70 font-medium"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer with Direct Contact */}
              <div className="mt-5 pt-3 border-t border-[#dfc7b2] flex items-center justify-between">
                <a
                  href={`mailto:${member.email || 'admin@srcaa.co.in'}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#8a5a41] hover:text-[#2f1d16] transition-colors"
                  title="Contact Editorial Office regarding this profile"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Editorial Office</span>
                </a>
                <span className="text-[10px] text-[#684f43] font-semibold">
                  SRCAA Verified
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-[#fffaf4] rounded-xl border border-[#dfc7b2]">
            <Users className="w-10 h-10 text-[#8a5a41] mx-auto mb-3 opacity-60" />
            <p className="font-serif font-bold text-lg text-[#2f1d16]">No editorial members found</p>
            <p className="text-sm text-[#684f43] mt-1">Try changing your search term or category filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#2f1d16] text-[#fffaf4] text-xs font-bold rounded-full"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Editorial Standards Note */}
        <div className="mt-10 p-5 sm:p-6 bg-[#fdf6ee] border border-[#dfc7b2] rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#8a5a41] shrink-0 mt-1" />
            <div>
              <p className="font-serif font-bold text-base text-[#2f1d16]">
                Editorial Independence & Conflict of Interest Policy
              </p>
              <p className="text-xs sm:text-sm text-[#684f43] mt-0.5">
                All editorial decisions are strictly separated from publisher administrative interests. Referees and editors with competing interests recuse themselves in adherence to COPE Guidelines.
              </p>
            </div>
          </div>
          <a
            href="#policies"
            className="shrink-0 px-4 py-2 bg-[#fffaf4] border border-[#8a5a41] text-[#8a5a41] hover:bg-[#8a5a41] hover:text-[#fffaf4] text-xs font-bold rounded-full transition-colors"
          >
            Review Policy 1 & 2
          </a>
        </div>

      </div>
    </section>
  );
};
