import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  GraduationCap, 
  Building2, 
  MapPin, 
  Mail, 
  Globe2, 
  BookOpen, 
  ShieldCheck, 
  Search,
  ExternalLink,
  Briefcase,
  Layers,
  Fingerprint,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { EDITORIAL_MEMBERS } from '../data/journalData';
import { EditorialMember } from '../types';

export const EditorialBoardSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredMembers = EDITORIAL_MEMBERS.filter((member) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'leadership' && member.category === 'leadership') ||
      (selectedCategory === 'advisory' && member.category === 'advisory') ||
      (selectedCategory === 'board' && (member.category === 'member' || member.category === 'specialist'));

    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.department && member.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.subAffiliation && member.subAffiliation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const getRoleCategoryBadge = (member: EditorialMember) => {
    switch (member.category) {
      case 'leadership':
        return {
          icon: <Award className="w-3.5 h-3.5 text-[#8a5a41]" />,
          label: 'Leadership',
          badgeClass: 'bg-[#f1e1d1] border-[#dfc7b2] text-[#513326]',
        };
      case 'advisory': {
        const isInternational = 
          member.location.includes('Australia') || 
          member.location.includes('Malaysia') || 
          (member.subAffiliation && member.subAffiliation.includes('Malaysia'));
        return {
          icon: isInternational ? (
            <Globe2 className="w-3.5 h-3.5 text-[#8a5a41]" />
          ) : (
            <Building2 className="w-3.5 h-3.5 text-[#8a5a41]" />
          ),
          label: isInternational ? 'International Advisory' : 'Industry & Project Advisory',
          badgeClass: 'bg-[#fdf6ee] border-[#dfc7b2] text-[#684f43]',
        };
      }
      case 'specialist':
        return {
          icon: <Sparkles className="w-3.5 h-3.5 text-[#8a5a41]" />,
          label: 'Guest Faculty & Specialist',
          badgeClass: 'bg-[#fdf6ee] border-[#dfc7b2] text-[#684f43]',
        };
      default:
        return {
          icon: <BookOpen className="w-3.5 h-3.5 text-[#8a5a41]" />,
          label: 'Editorial Board Member',
          badgeClass: 'bg-[#fffaf4] border-[#dfc7b2] text-[#513326]',
        };
    }
  };

  return (
    <section id="editorial-board" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fffdf9] border-b border-[#dfc7b2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Refined Icons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e1d1] text-[#8a5a41] text-xs font-bold uppercase tracking-widest border border-[#dfc7b2]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8a5a41]" />
              Peer Leadership & Scholarly Governance
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#2f1d16] mt-3 flex items-center gap-2.5">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#8a5a41] shrink-0" />
              <span>Editorial Board & Our Editors</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#684f43] max-w-2xl leading-relaxed">
              Distinguished researchers, academic administrators, university chairs, and institutional leaders directing the peer review integrity, publication ethics, and scholarly standards of SGRCR.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#8a5a41] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search editors by name, college, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-[#fffaf4] border border-[#dfc7b2] rounded-full text-[#2f1d16] focus:outline-hidden focus:ring-2 focus:ring-[#8a5a41] transition-all placeholder:text-[#8a5a41]/70"
            />
          </div>
        </div>

        {/* Category Filter Pills with Icons */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#dfc7b2] pb-4">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All Editors & Board Members ({EDITORIAL_MEMBERS.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('leadership')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'leadership'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Leadership & Academic Heads</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('board')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'board'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Board Members</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('advisory')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCategory === 'advisory'
                ? 'bg-[#2f1d16] text-[#fffaf4] shadow-xs'
                : 'bg-[#fffaf4] text-[#513326] border border-[#dfc7b2] hover:bg-[#f1e1d1]'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Advisory & Industry Fellows</span>
          </button>
        </div>

        {/* Member Cards Grid - No serial numbers, richly iconified, fully responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredMembers.map((member) => {
            const badge = getRoleCategoryBadge(member);

            return (
              <article
                key={member.id}
                className="flex flex-col justify-between bg-[#fffaf4] border border-[#dfc7b2] rounded-xl p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  {/* Top Header: Avatar & Category Badge (No serial numbers) */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="relative">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#2f1d16] text-[#fffaf4] font-serif font-bold text-base sm:text-lg flex items-center justify-center shadow-xs ring-2 ring-[#c69470]/60 group-hover:ring-[#8a5a41] transition-all">
                        {member.initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 p-1 bg-[#fffaf4] rounded-full shadow-xs border border-[#dfc7b2]">
                        {badge.icon}
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold ${badge.badgeClass}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>
                  </div>

                  {/* Member Name */}
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#2f1d16] leading-snug">
                    {member.name}
                  </h3>

                  {/* Role Designation with Briefcase Icon */}
                  <div className="flex items-start gap-1.5 text-xs sm:text-sm font-bold text-[#8a5a41] mt-1.5 mb-2 leading-relaxed">
                    <Briefcase className="w-4 h-4 text-[#8a5a41] shrink-0 mt-0.5" />
                    <span>{member.role}</span>
                  </div>

                  {/* Department (if provided) */}
                  {member.department && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#684f43] mb-2">
                      <Layers className="w-3.5 h-3.5 text-[#c69470] shrink-0" />
                      <span>{member.department}</span>
                    </div>
                  )}

                  {/* Institutional Affiliation & Details with Icons */}
                  <div className="space-y-2 mt-3 pt-3 border-t border-[#dfc7b2]/70 text-xs sm:text-sm text-[#513326]">
                    {/* Primary Institution */}
                    <div className="flex items-start gap-2">
                      <Building2 className="w-4 h-4 text-[#8a5a41] shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <strong>Institution:</strong> {member.affiliation}
                      </p>
                    </div>

                    {/* Sub Affiliation / University Affiliation */}
                    {member.subAffiliation && (
                      <div className="flex items-start gap-2 text-xs text-[#684f43]">
                        <GraduationCap className="w-3.5 h-3.5 text-[#c69470] shrink-0 mt-0.5" />
                        <p className="leading-snug">{member.subAffiliation}</p>
                      </div>
                    )}

                    {/* Location */}
                    <div className="flex items-start gap-2 text-xs text-[#8a5a41]">
                      <MapPin className="w-3.5 h-3.5 text-[#8a5a41] shrink-0 mt-0.5" />
                      <span className="leading-snug">{member.location}</span>
                    </div>

                    {/* Additional Roles / Responsibilities Tags */}
                    {member.additionalRoles && member.additionalRoles.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {member.additionalRoles.map((roleText, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#fdf6ee] text-[#513326] rounded-md text-[11px] border border-[#dfc7b2] font-medium"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#8a5a41] shrink-0" />
                            <span>{roleText}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Contact Links & Profile Badges */}
                <div className="mt-5 pt-3.5 border-t border-[#dfc7b2] space-y-2">
                  {/* Email Contact Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8a5a41] hover:text-[#2f1d16] transition-colors"
                        title={`Email ${member.name}`}
                      >
                        <Mail className="w-3.5 h-3.5 text-[#8a5a41]" />
                        <span className="truncate max-w-[200px]">{member.email}</span>
                      </a>
                    )}
                  </div>

                  {/* External Links: Institutional Profile & ORCID */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#dfc7b2]/40">
                    {member.institutionalProfile ? (
                      <a
                        href={member.institutionalProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#8a5a41] hover:text-[#2f1d16] hover:underline"
                        title="View Institutional Faculty Profile"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Institutional Profile</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-[#684f43] font-medium">
                        SRCAA Editorial Office
                      </span>
                    )}

                    {member.orcid && (
                      <a
                        href={`https://orcid.org/${member.orcid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#a6ce39]/15 text-[#335500] border border-[#a6ce39]/40 rounded text-xs font-semibold hover:bg-[#a6ce39]/25 transition-colors"
                        title="View Verified ORCID Researcher Record"
                      >
                        <Fingerprint className="w-3 h-3 text-[#4c7800]" />
                        <span>ORCID: {member.orcid}</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
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

