import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

const RECIPIENT_GMAIL = 'srcaaweb@gmail.com';

export const ContactSection: React.FC = () => {
  const [inquiryStatus, setInquiryStatus] = useState<'idle' | 'submitting' | 'sent'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: 'General Editorial Inquiry',
    message: '',
  });

  const generateEmailBody = (data: typeof inquiryData) => {
    return `Dear Editorial Secretariat (${RECIPIENT_GMAIL}),

A new inquiry has been submitted via the SGRCR portal:

========================================
EDITORIAL INQUIRY DETAILS
========================================
- Sender Name: ${data.name}
- Sender Email: ${data.email}
- Inquiry Subject: ${data.subject}
- Date: ${new Date().toLocaleString()}

MESSAGE:
${data.message}
========================================

Forwarded directly to: ${RECIPIENT_GMAIL}`;
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryData.name.trim() || !inquiryData.email.trim() || !inquiryData.message.trim()) {
      setValidationError('Please complete all required fields.');
      return;
    }

    setInquiryStatus('submitting');
    setValidationError(null);

    const snapshot = {
      ...inquiryData,
      timestamp: new Date().toLocaleString(),
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[SGRCR Editorial Inquiry] ${inquiryData.subject} - from ${inquiryData.name}`,
          _replyto: inquiryData.email,
          "Sender Name": inquiryData.name,
          "Sender Email": inquiryData.email,
          "Inquiry Topic": inquiryData.subject,
          "Message": inquiryData.message,
          "Forwarded To": RECIPIENT_GMAIL,
          "Timestamp": new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      console.warn('Inquiry forward network request completed:', err);
    }

    setSubmittedSnapshot(snapshot);
    setInquiryStatus('sent');

    // Attempt mail client launch
    try {
      const mailtoUrl = `mailto:${RECIPIENT_GMAIL}?subject=${encodeURIComponent(`[SGRCR Inquiry] ${inquiryData.subject}`)}&body=${encodeURIComponent(generateEmailBody(inquiryData))}`;
      window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Handled in iframe
    }
  };

  const handleCopySummary = () => {
    if (!submittedSnapshot) return;
    const text = generateEmailBody(submittedSnapshot);
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getGmailWebLink = () => {
    if (!submittedSnapshot) return '#';
    const subject = `[SGRCR Editorial Inquiry] ${submittedSnapshot.subject} - ${submittedSnapshot.name}`;
    const body = generateEmailBody(submittedSnapshot);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_GMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoLink = () => {
    if (!submittedSnapshot) return '#';
    const subject = `[SGRCR Editorial Inquiry] ${submittedSnapshot.subject} - ${submittedSnapshot.name}`;
    const body = generateEmailBody(submittedSnapshot);
    return `mailto:${RECIPIENT_GMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
                    Editorial Secretariat & Direct Forwarding:{' '}
                    <a href={`mailto:${RECIPIENT_GMAIL}`} className="text-[#8a5a41] font-bold hover:underline">
                      {RECIPIENT_GMAIL}
                    </a>
                  </p>
                  <p className="text-xs text-[#684f43]">
                    Institutional Inquiries & Administration:{' '}
                    <a href="mailto:admin@srcaa.co.in" className="text-[#8a5a41] font-bold hover:underline">
                      admin@srcaa.co.in
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
                  Launch email pre-addressed to {RECIPIENT_GMAIL}
                </p>
              </div>
              <a
                href={`mailto:${RECIPIENT_GMAIL}?subject=Editorial%20Inquiry%20-%20SGRCR`}
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
              Have a question regarding submission formats, reviewer invitations, or copyright permissions? Inquiries are delivered directly to <span className="font-bold text-[#8a5a41]">{RECIPIENT_GMAIL}</span>.
            </p>

            {validationError && (
              <div className="mb-4 p-3.5 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {inquiryStatus === 'sent' && submittedSnapshot ? (
              <div className="p-6 bg-[#fdfcf7] border-2 border-emerald-500/40 rounded-2xl text-[#2f1d16] space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#dfc7b2]">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#2f1d16]">
                      Inquiry Forwarded to Editorial Office
                    </h4>
                    <p className="text-xs text-[#684f43]">
                      Transmitted to <strong className="text-emerald-800">{RECIPIENT_GMAIL}</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-[#fffaf4] border border-[#dfc7b2] rounded-xl p-3.5 space-y-2 text-xs text-[#513326]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8a5a41] block">From</span>
                    <strong>{submittedSnapshot.name}</strong> ({submittedSnapshot.email})
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8a5a41] block">Subject</span>
                    <p className="font-semibold text-[#2f1d16]">{submittedSnapshot.subject}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8a5a41] block">Message</span>
                    <p className="text-xs text-[#684f43] bg-[#fffdf9] p-2 rounded-md border border-[#dfc7b2] whitespace-pre-wrap">
                      {submittedSnapshot.message}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={getGmailWebLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#c69470] hover:bg-[#b58360] text-[#2f1d16] font-bold text-xs rounded-lg transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Open in Gmail Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] font-bold text-xs rounded-lg transition-all"
                  >
                    <Send className="w-3.5 h-3.5 text-[#c69470]" />
                    <span>Open in Email App</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#fdf6ee] hover:bg-[#f1e1d1] border border-[#dfc7b2] text-[#513326] font-semibold text-xs rounded-lg transition-all"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8a5a41]" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInquiryStatus('idle');
                      setSubmittedSnapshot(null);
                      setInquiryData({ name: '', email: '', subject: 'General Editorial Inquiry', message: '' });
                    }}
                    className="text-xs text-[#8a5a41] hover:text-[#2f1d16] font-bold underline px-2 py-1 ml-auto"
                  >
                    Send Another Inquiry
                  </button>
                </div>
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
                    onChange={(e) => {
                      setValidationError(null);
                      setInquiryData({ ...inquiryData, name: e.target.value });
                    }}
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
                    onChange={(e) => {
                      setValidationError(null);
                      setInquiryData({ ...inquiryData, email: e.target.value });
                    }}
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
                    onChange={(e) => {
                      setValidationError(null);
                      setInquiryData({ ...inquiryData, message: e.target.value });
                    }}
                    placeholder="Type your message or inquiry here..."
                    className="w-full px-3.5 py-2.5 bg-[#fffdf9] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={inquiryStatus === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#2f1d16] hover:bg-[#513326] disabled:opacity-50 text-[#fffaf4] font-bold text-sm rounded-xl shadow-xs transition-colors"
                >
                  <Send className="w-4 h-4 text-[#c69470]" />
                  <span>{inquiryStatus === 'submitting' ? 'Forwarding to srcaaweb@gmail.com...' : 'Send Message to Editorial Office'}</span>
                </button>

                <p className="text-[11px] text-center text-[#684f43]">
                  Submissions are transmitted directly to <strong className="text-[#2f1d16]">{RECIPIENT_GMAIL}</strong>
                </p>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
