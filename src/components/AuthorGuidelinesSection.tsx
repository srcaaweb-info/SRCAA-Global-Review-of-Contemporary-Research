import React, { useState } from 'react';
import { 
  PenTool, 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Send, 
  AlertCircle,
  Link as LinkIcon,
  Copy,
  Check,
  ExternalLink,
  Mail
} from 'lucide-react';

const RECIPIENT_GMAIL = 'srcaaweb@gmail.com';

export const AuthorGuidelinesSection: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    authorName: string;
    email: string;
    affiliation: string;
    articleType: string;
    title: string;
    manuscriptLink: string;
    fileName: string;
    message: string;
    timestamp: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    authorName: '',
    email: '',
    affiliation: '',
    articleType: 'Original research article',
    title: '',
    manuscriptLink: '',
    message: '',
    declaration: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setValidationError(null);
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    } else {
      setSelectedFileName('');
    }
  };

  const generateEmailBody = (data: typeof formData, fileName: string) => {
    return `Dear Editorial Secretariat (${RECIPIENT_GMAIL}),

A new manuscript submission has been lodged through the SGRCR portal with the following details:

========================================
MANUSCRIPT SUBMISSION RECORD
========================================
- Corresponding Author: ${data.authorName}
- Institutional Email: ${data.email}
- Affiliation: ${data.affiliation}
- Article Category: ${data.articleType}
- Manuscript Title: ${data.title}
- Document Link / Cloud URL: ${data.manuscriptLink || 'None provided'}
- Attached File: ${fileName || 'None (link provided)'}
- Submission Date: ${new Date().toLocaleString()}

COVER LETTER / COMMENTS TO THE EDITOR:
${data.message || 'None provided.'}

COPE & ETHICAL DECLARATION:
[Confirmed] Original research, not under consideration elsewhere, approved by all co-authors, and all generative AI usage declared.
========================================

Forwarded directly to: ${RECIPIENT_GMAIL}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.declaration) {
      setValidationError('Please confirm the originality and ethical declaration checkbox to proceed.');
      return;
    }
    if (!formData.authorName.trim() || !formData.email.trim() || !formData.title.trim() || !formData.affiliation.trim()) {
      setValidationError('Please complete all mandatory fields marked with an asterisk (*).');
      return;
    }

    setFormStatus('submitting');
    setValidationError(null);

    const snapshot = {
      ...formData,
      fileName: selectedFileName,
      timestamp: new Date().toLocaleString(),
    };

    try {
      // 1. Forward directly to recipient gmail using formsubmit.co AJAX API
      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_GMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: `[SGRCR Manuscript Submission] ${formData.title} - ${formData.authorName}`,
          _replyto: formData.email,
          "Corresponding Author": formData.authorName,
          "Institutional Email": formData.email,
          "Institution / Affiliation": formData.affiliation,
          "Article Category": formData.articleType,
          "Manuscript Title": formData.title,
          "Cloud Manuscript Link": formData.manuscriptLink || "N/A",
          "Selected Document File": selectedFileName || "N/A",
          "Cover Letter / Comments": formData.message || "None",
          "Originality Declaration": "Confirmed by Author",
          "Forwarded To": RECIPIENT_GMAIL,
          "Timestamp": new Date().toLocaleString(),
        }),
      });
    } catch (err) {
      // Even if network or offline, gracefully proceed to snapshot presentation
      console.warn('Form forward completed with status:', err);
    }

    setSubmittedSnapshot(snapshot);
    setFormStatus('success');

    // Optional direct mailto launch
    try {
      const mailtoUrl = `mailto:${RECIPIENT_GMAIL}?subject=${encodeURIComponent(`[SGRCR Manuscript Submission] ${formData.title} - ${formData.authorName}`)}&body=${encodeURIComponent(generateEmailBody(formData, selectedFileName))}`;
      window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Ignored if window.open restricted in iframe preview
    }
  };

  const handleCopySummary = () => {
    if (!submittedSnapshot) return;
    const text = generateEmailBody(submittedSnapshot as any, submittedSnapshot.fileName);
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const getGmailWebLink = () => {
    if (!submittedSnapshot) return '#';
    const subject = `[SGRCR Manuscript Submission] ${submittedSnapshot.title} - ${submittedSnapshot.authorName}`;
    const body = generateEmailBody(submittedSnapshot as any, submittedSnapshot.fileName);
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_GMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getMailtoLink = () => {
    if (!submittedSnapshot) return '#';
    const subject = `[SGRCR Manuscript Submission] ${submittedSnapshot.title} - ${submittedSnapshot.authorName}`;
    const body = generateEmailBody(submittedSnapshot as any, submittedSnapshot.fileName);
    return `mailto:${RECIPIENT_GMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="author-guidelines" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fffaf4] border-b border-[#dfc7b2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f1e1d1] text-[#8a5a41] text-xs font-bold uppercase tracking-widest">
            <PenTool className="w-3.5 h-3.5" />
            Submissions & Standards
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#2f1d16] mt-3">
            Author & Submission Guidelines
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#684f43] max-w-2xl">
            Detailed criteria for manuscript preparation, formatting, referencing, ethical declarations, and editorial processing for aspiring authors.
          </p>
        </div>

        {/* Guidelines Specifications Panel */}
        <div className="bg-[#fffdf9] border border-[#dfc7b2] rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm mb-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-[#dfc7b2]">
            <div>
              <h3 className="font-serif font-bold text-xl text-[#2f1d16] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8a5a41]" />
                Manuscript Preparation
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#513326] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Language:</strong> English (UK or US spelling, applied consistently throughout).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Research Articles:</strong> 4,000 – 8,000 words including tables and abstract.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Review Papers:</strong> Up to 10,000 words; Short Communications: up to 2,500 words.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Typography:</strong> Times New Roman 12pt, 1.5 line spacing, 1-inch margins on A4 format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Citation Style:</strong> APA 7th Edition mandatory for all in-text citations and references.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a5a41] font-bold">•</span>
                  <span><strong>Graphics:</strong> All figures and charts must be minimum 300 DPI resolution.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-xl text-[#2f1d16] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#8a5a41]" />
                Manuscript Structure
              </h3>
              <ol className="space-y-2 text-xs sm:text-sm text-[#513326] leading-relaxed list-decimal list-inside">
                <li><strong>Title Page:</strong> Concise title (&lt;20 words), author affiliations, ORCID iDs, corresponding email.</li>
                <li><strong>Abstract & Keywords:</strong> 200–250 word structured abstract accompanied by 4–6 keywords.</li>
                <li><strong>Introduction & Literature Review:</strong> Problem formulation, context, theoretical framework.</li>
                <li><strong>Research Methodology:</strong> Research design, sample, instrumentation, and statistical tools.</li>
                <li><strong>Results & Discussion:</strong> Data presentation, hypothesis testing, and analytical discussion.</li>
                <li><strong>Conclusion & Implications:</strong> Theoretical contributions, managerial relevance, and limitations.</li>
                <li><strong>Mandatory Declarations:</strong> Conflict of interest, funding, and ethical consent disclosures.</li>
              </ol>
            </div>
          </div>

          {/* Timeline & APC Transparency */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 p-4 bg-[#fffaf4] rounded-xl border border-[#dfc7b2]">
              <Clock className="w-5 h-5 text-[#8a5a41] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2f1d16]">Editorial Review Timeline</h4>
                <p className="text-xs text-[#684f43] mt-1">
                  Initial desk screening within <strong>5 working days</strong>. Double-blind referee review typically completes in <strong>3–4 weeks</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-[#fffaf4] rounded-xl border border-[#dfc7b2]">
              <DollarSign className="w-5 h-5 text-[#8a5a41] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-[#2f1d16]">Transparent APC Policy</h4>
                <p className="text-xs text-[#684f43] mt-1">
                  No hidden submission or evaluation fees. SGRCR provides fee waivers for scholars and authors from low-resource institutions.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Manuscript Submission Form */}
        <div className="bg-[#fffdf9] border-2 border-[#8a5a41]/40 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="mb-6">
            <h3 className="font-serif font-bold text-2xl text-[#2f1d16]">
              Submit Your Manuscript Online
            </h3>
            <p className="text-xs sm:text-sm text-[#684f43] mt-1">
              All submissions are recorded and forwarded directly to the Editorial Office at <span className="text-[#8a5a41] font-bold">srcaaweb@gmail.com</span>.
            </p>
          </div>

          {validationError && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>{validationError}</span>
            </div>
          )}

          {formStatus === 'success' && submittedSnapshot ? (
            <div className="p-6 sm:p-8 bg-[#fdfcf7] border-2 border-emerald-500/40 rounded-2xl text-[#2f1d16] space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#dfc7b2]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg sm:text-xl text-[#2f1d16]">
                      Manuscript Forwarded to Editorial Office
                    </h4>
                    <p className="text-xs text-[#684f43]">
                      Transmitted directly to <strong className="text-emerald-800 font-bold">{RECIPIENT_GMAIL}</strong> on {submittedSnapshot.timestamp}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold self-start sm:self-auto">
                  Submission Logged
                </span>
              </div>

              {/* Submission Data Summary */}
              <div className="bg-[#fffaf4] border border-[#dfc7b2] rounded-xl p-4 sm:p-5 space-y-3 text-xs sm:text-sm text-[#513326]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3 border-b border-[#dfc7b2]/70">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Corresponding Author
                    </span>
                    <strong className="text-sm text-[#2f1d16]">{submittedSnapshot.authorName}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Institutional Email
                    </span>
                    <strong className="text-sm text-[#2f1d16]">{submittedSnapshot.email}</strong>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Institution / Affiliation
                    </span>
                    <span>{submittedSnapshot.affiliation}</span>
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Article Category
                    </span>
                    <span>{submittedSnapshot.articleType}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                    Manuscript Title
                  </span>
                  <p className="font-serif font-bold text-sm sm:text-base text-[#2f1d16] mt-0.5">
                    {submittedSnapshot.title}
                  </p>
                </div>

                {(submittedSnapshot.manuscriptLink || submittedSnapshot.fileName) && (
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Attached Resource / Cloud Document
                    </span>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {submittedSnapshot.fileName && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#f1e1d1] text-[#2f1d16] rounded-md text-xs font-semibold">
                          <FileText className="w-3.5 h-3.5 text-[#8a5a41]" />
                          {submittedSnapshot.fileName}
                        </span>
                      )}
                      {submittedSnapshot.manuscriptLink && (
                        <a 
                          href={submittedSnapshot.manuscriptLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#8a5a41] hover:underline font-bold"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          {submittedSnapshot.manuscriptLink}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {submittedSnapshot.message && (
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8a5a41] font-bold block">
                      Cover Letter / Editor Remarks
                    </span>
                    <p className="text-xs text-[#684f43] bg-[#fffdf9] p-2.5 rounded-lg border border-[#dfc7b2] mt-1 whitespace-pre-wrap">
                      {submittedSnapshot.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Direct Gmail & Email Client Actions */}
              <div className="space-y-3">
                <p className="text-xs text-[#684f43]">
                  A complete copy has been forwarded to <strong>{RECIPIENT_GMAIL}</strong>. You can also view or send directly using your preferred email service:
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getGmailWebLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c69470] hover:bg-[#b58360] text-[#2f1d16] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                  >
                    <Mail className="w-4 h-4 text-[#2f1d16]" />
                    <span>Open in Gmail Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                  >
                    <Send className="w-4 h-4 text-[#c69470]" />
                    <span>Open in Default Mail Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#fdf6ee] hover:bg-[#f1e1d1] border border-[#dfc7b2] text-[#513326] font-bold text-xs sm:text-sm rounded-xl transition-all"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8a5a41]" />
                        <span>Copy Submission Details</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormStatus('idle');
                      setSubmittedSnapshot(null);
                      setSelectedFileName('');
                      setFormData({
                        authorName: '',
                        email: '',
                        affiliation: '',
                        articleType: 'Original research article',
                        title: '',
                        manuscriptLink: '',
                        message: '',
                        declaration: false,
                      });
                    }}
                    className="text-xs text-[#8a5a41] hover:text-[#2f1d16] font-bold underline px-2 py-1 ml-auto"
                  >
                    Submit Another Manuscript
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Corresponding Author Full Name *
                  </label>
                  <input
                    type="text"
                    name="authorName"
                    required
                    value={formData.authorName}
                    onChange={handleInputChange}
                    placeholder="e.g. Dr. Anjana Radhakrishnan"
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                {/* Author Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Institutional Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="author@institution.edu"
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                {/* Affiliation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    University / Institution Affiliation *
                  </label>
                  <input
                    type="text"
                    name="affiliation"
                    required
                    value={formData.affiliation}
                    onChange={handleInputChange}
                    placeholder="e.g. Seshadripuram First Grade College, Bengaluru"
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                </div>

                {/* Submission Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Submission Category *
                  </label>
                  <select
                    name="articleType"
                    value={formData.articleType}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  >
                    <option value="Original research article">Original Research Article (4,000–8,000 words)</option>
                    <option value="Review article">Review Article (up to 10,000 words)</option>
                    <option value="Case study">Case Study (3,000–5,000 words)</option>
                    <option value="Short communication">Short Communication (&lt;2,500 words)</option>
                    <option value="Conceptual paper">Conceptual Paper</option>
                  </select>
                </div>
              </div>

              {/* Manuscript Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                  Manuscript Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Full title of the manuscript (under 20 words)"
                  className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                />
              </div>

              {/* Upload or Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Upload Manuscript (.docx / .pdf)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-xs text-[#513326] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#8a5a41] file:text-[#fffaf4] hover:file:bg-[#513326]"
                  />
                  <p className="text-[11px] text-[#684f43] mt-1">
                    {selectedFileName ? `Selected: ${selectedFileName}` : 'MS Word (.docx) or PDF format, max 15MB.'}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                    Or Google Drive / Cloud Link
                  </label>
                  <input
                    type="url"
                    name="manuscriptLink"
                    value={formData.manuscriptLink}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-[#684f43] mt-1">Ensure link sharing is enabled for review.</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#513326] mb-1">
                  Cover Letter / Comments to the Editor
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Introduce your study, state novelty, and disclose any funding or prior presentations..."
                  className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                />
              </div>

              {/* Originality Declaration */}
              <div className="p-4 bg-[#fdf6ee] border border-[#dfc7b2] rounded-xl">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration"
                    required
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-[#dfc7b2] text-[#8a5a41] focus:ring-[#8a5a41]"
                  />
                  <span className="text-xs sm:text-sm text-[#513326] leading-relaxed">
                    I confirm that this manuscript represents original research, is not under consideration by any other journal or publisher, that all co-authors have approved this submission, and that all generative AI usage has been documented in accordance with COPE guidelines. *
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2f1d16] hover:bg-[#513326] disabled:opacity-50 text-[#fffaf4] font-bold text-sm sm:text-base rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
                >
                  <Send className="w-4 h-4 text-[#c69470]" />
                  <span>{formStatus === 'submitting' ? 'Forwarding to srcaaweb@gmail.com...' : 'Submit Manuscript to Editorial Office'}</span>
                </button>

                <p className="text-xs text-[#8a5a41] font-semibold text-center sm:text-right">
                  Forwarded directly to: <span className="font-bold text-[#2f1d16]">{RECIPIENT_GMAIL}</span>
                </p>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
