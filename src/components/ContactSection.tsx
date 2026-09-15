import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: 'General Editorial Inquiry',
    message: '',
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryStatus('submitting');
    setTimeout(() => {
      setInquiryStatus('sent');
    }, 1000);
  };

  return (
    <section id="editorial-office" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fffdf9] border-b border-[#dfc7b2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e1d1] text-[#8a5a41] text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" />
            Direct Communication
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#2f1d16] mt-3">
            Editorial Office & Correspondence
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#684f43] max-w-2xl">
            Get in touch with the Managing Editor, Editorial Assistant, and Academic Secretariat for inquiries regarding manuscript status, special issues, or institutional affiliations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          
          {/* Office & Details Info */}
          <div className="space-y-6">
            <div className="bg-[#fffaf4] border border-[#dfc7b2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-5">
              <h3 className="font-serif font-bold text-xl text-[#2f1d16]">
                Registered Editorial Office
              </h3>
              
              <div className="flex items-start gap-3.5 text-sm text-[#513326]">
                <MapPin className="w-5 h-5 text-[#8a5a41] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2f1d16]">Shakti Research Centre and Academia (SRCAA)</strong>
                  <p className="text-xs sm:text-sm text-[#684f43] mt-0.5">
                    Yelahanka / Bengaluru, Karnataka, India.<br />
                    Accredited under International Trade Council (ITC) Framework.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-[#513326] pt-3 border-t border-[#dfc7b2]">
                <Mail className="w-5 h-5 text-[#8a5a41] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-[#2f1d16]">Official Email Communications</strong>
                  <p className="text-xs text-[#684f43]">
                    Manuscript Submissions & Decisions:{' '}
                    <a href="mailto:admin@srcaa.co.in" className="text-[#8a5a41] font-bold hover:underline">
                      admin@srcaa.co.in
                    </a>
                  </p>
                  <p className="text-xs text-[#684f43]">
                    General Inquiries & Institutional Partnerships:{' '}
                    <a href="mailto:srcaacontact@gmail.com" className="text-[#8a5a41] font-bold hover:underline">
                      srcaacontact@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-sm text-[#513326] pt-3 border-t border-[#dfc7b2]">
                <Phone className="w-5 h-5 text-[#8a5a41] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2f1d16]">Editorial Desk Working Hours</strong>
                  <p className="text-xs text-[#684f43] mt-0.5">
                    Monday to Friday: 09:30 AM – 05:30 PM (IST)<br />
                    Response time: Within 24–48 working hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="p-6 bg-[#2f1d16] text-[#fffaf4] rounded-2xl flex items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-base text-[#e6bd94]">
                  Direct Email to Editorial Secretariat
                </p>
                <p className="text-xs text-[#dfc7b2] mt-0.5">
                  Launch default email client pre-addressed to admin@srcaa.co.in
                </p>
              </div>
              <a
                href="mailto:admin@srcaa.co.in?subject=Editorial%20Inquiry%20-%20SGRCR"
                className="shrink-0 px-4 py-2.5 bg-[#c69470] hover:bg-[#d9a985] text-[#2f1d16] font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                Send Email
              </a>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="bg-[#fffaf4] border border-[#dfc7b2] rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className="font-serif font-bold text-xl text-[#2f1d16] mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#8a5a41]" />
              Send an Editorial Inquiry
            </h3>
            <p className="text-xs text-[#684f43] mb-6">
              Have a question regarding submission formats, reviewer invitations, or copyright permissions? Leave a message below.
            </p>

            {inquiryStatus === 'sent' ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 space-y-3">
                <div className="flex items-center gap-2 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Inquiry Transmitted Successfully</span>
                </div>
                <p className="text-xs sm:text-sm">
                  Thank you, {inquiryData.name}. The editorial secretariat has received your query and will reply to <strong>{inquiryData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInquiryStatus('idle');
                    setInquiryData({ name: '', email: '', subject: 'General Editorial Inquiry', message: '' });
                  }}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-lg"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Prof. / Dr. / Researcher Name"
                    className="w-full px-3.5 py-2.5 bg-[#fffdf9] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    placeholder="email@institution.edu"
                    className="w-full px-3.5 py-2.5 bg-[#fffdf9] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={inquiryData.subject}
                    onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#fffdf9] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  >
                    <option>General Editorial Inquiry</option>
                    <option>Manuscript Status Follow-up</option>
                    <option>Reviewer Application</option>
                    <option>Special Issue Proposal</option>
                    <option>Copyright & Licensing Request</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Type your message or inquiry here..."
                    className="w-full px-3.5 py-2.5 bg-[#fffdf9] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryStatus === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] font-bold text-sm rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-4 h-4 text-[#c69470]" />
                  <span>{inquiryStatus === 'submitting' ? 'Transmitting...' : 'Send Message to Editorial Office'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
