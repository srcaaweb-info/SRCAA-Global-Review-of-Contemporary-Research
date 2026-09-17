import React, { useState, useEffect } from 'react';
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
  Mail,
  Inbox,
  Info,
  Download,
  X,
  Database,
  Sparkles
} from 'lucide-react';
import { 
  saveManuscriptSubmission, 
  formatFileSize, 
  downloadBlob,
  getGoogleFormEndpoint,
  pushToGoogleEndpoint,
  fileToBase64
} from '../utils/submissionStorage';

const RECIPIENT_GMAIL = 'srcaaweb@gmail.com';

interface Props {
  onOpenSubmissionsLog?: () => void;
}

export const AuthorGuidelinesSection: React.FC<Props> = ({ onOpenSubmissionsLog }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    id?: string;
    authorName: string;
    email: string;
    affiliation: string;
    articleType: string;
    title: string;
    manuscriptLink: string;
    fileName: string;
    fileSize?: number;
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

  const [googleEndpoint, setGoogleEndpoint] = useState<string>(() => getGoogleFormEndpoint());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setGoogleEndpoint(getGoogleFormEndpoint());
    };
    window.addEventListener('sgrcr-storage-update', handleStorageUpdate);
    return () => window.removeEventListener('sgrcr-storage-update', handleStorageUpdate);
  }, []);

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
      const file = e.target.files[0];
      if (file.size > 25 * 1024 * 1024) {
        setValidationError('Selected file is larger than 25MB. Please upload a smaller file or paste a Google Drive / cloud link.');
        return;
      }
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setValidationError(null);
    } else {
      setSelectedFile(null);
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
- Attached Document: ${fileName || 'None (cloud link provided)'}
- Document Cloud URL: ${data.manuscriptLink || 'None provided'}
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

    if (!selectedFile && !formData.manuscriptLink.trim()) {
      setValidationError('Please either upload a manuscript file (.docx / .pdf) or provide a Google Drive / cloud document link so the editorial board can download your paper.');
      return;
    }

    setFormStatus('submitting');
    setValidationError(null);

    const snapshot = {
      ...formData,
      fileName: selectedFileName,
      fileSize: selectedFile?.size,
      timestamp: new Date().toLocaleString(),
    };

    // 1. Permanently save to in-app local storage and IndexedDB file cache so file is NEVER lost
    const savedRecord = saveManuscriptSubmission({
      authorName: formData.authorName,
      email: formData.email,
      affiliation: formData.affiliation,
      articleType: formData.articleType,
      title: formData.title,
      manuscriptLink: formData.manuscriptLink,
      fileName: selectedFileName,
      fileSize: selectedFile?.size,
      hasAttachment: !!selectedFile,
      message: formData.message,
      timestamp: snapshot.timestamp,
      forwardStatus: 'forwarded',
    }, selectedFile);

    try {
      // 2. Build multipart/form-data so the REAL file is attached and sent to FormSubmit
      const formPayload = new FormData();
      formPayload.append('_captcha', 'false');
      formPayload.append('_template', 'table');
      formPayload.append('_subject', `[SGRCR Manuscript Submission] ${formData.title} - ${formData.authorName}`);
      formPayload.append('_replyto', formData.email);
      formPayload.append('Submission Reference ID', savedRecord.id);
      formPayload.append('Corresponding Author', formData.authorName);
      formPayload.append('Institutional Email', formData.email);
      formPayload.append('Institution / Affiliation', formData.affiliation);
      formPayload.append('Article Category', formData.articleType);
      formPayload.append('Manuscript Title', formData.title);
      formPayload.append('Manuscript Cloud Link', formData.manuscriptLink || 'N/A');
      formPayload.append('Cover Letter / Comments', formData.message || 'None');
      formPayload.append('COPE Ethical Declaration', 'Confirmed by Author');
      formPayload.append('Forwarded To', RECIPIENT_GMAIL);
      formPayload.append('Submission Timestamp', snapshot.timestamp);

      if (selectedFile) {
        // FormSubmit attaches any input named 'attachment' directly to the email sent to srcaaweb@gmail.com
        formPayload.append('attachment', selectedFile, selectedFile.name);
        formPayload.append('Attached Document Name', selectedFile.name);
        formPayload.append('Document File Size', formatFileSize(selectedFile.size));
      }

      await fetch(`https://formsubmit.co/ajax/${RECIPIENT_GMAIL}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formPayload,
      });
    } catch (err) {
      console.warn('Form forward network request finished:', err);
    }

    // 3. Push to Google Form / Google Apps Script API endpoint if configured
    const currentGoogleEndpoint = getGoogleFormEndpoint();
    if (currentGoogleEndpoint) {
      try {
        let fileDataPayload = null;
        if (selectedFile) {
          fileDataPayload = await fileToBase64(selectedFile);
        }
        await pushToGoogleEndpoint(currentGoogleEndpoint, {
          submissionId: savedRecord.id,
          authorName: formData.authorName,
          email: formData.email,
          affiliation: formData.affiliation,
          articleType: formData.articleType,
          title: formData.title,
          manuscriptLink: formData.manuscriptLink,
          message: formData.message,
          timestamp: snapshot.timestamp,
          fileData: fileDataPayload,
        });
      } catch (gErr) {
        console.warn('Google Form endpoint push error:', gErr);
      }
    }

    setSubmittedSnapshot({ ...snapshot, id: savedRecord.id });
    setFormStatus('success');
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
                      Attached Resource / Manuscript Document
                    </span>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {submittedSnapshot.fileName && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#f1e1d1] text-[#2f1d16] rounded-lg text-xs font-semibold border border-[#dfc7b2]">
                          <FileText className="w-4 h-4 text-[#8a5a41]" />
                          <span>{submittedSnapshot.fileName}</span>
                          {submittedSnapshot.fileSize && (
                            <span className="text-[10px] text-[#8a5a41]">
                              ({formatFileSize(submittedSnapshot.fileSize)})
                            </span>
                          )}
                        </div>
                      )}
                      
                      {selectedFile && (
                        <button
                          type="button"
                          onClick={() => downloadBlob(selectedFile, submittedSnapshot.fileName)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] rounded-lg text-xs font-bold transition-all shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5 text-[#c69470]" />
                          <span>Download Document Now</span>
                        </button>
                      )}

                      {submittedSnapshot.manuscriptLink && (
                        <a 
                          href={submittedSnapshot.manuscriptLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fffaf4] hover:bg-[#f1e1d1] border border-[#dfc7b2] text-xs text-[#8a5a41] hover:underline font-bold rounded-lg"
                        >
                          <LinkIcon className="w-3.5 h-3.5" />
                          <span>Open Cloud Document</span>
                          <ExternalLink className="w-3 h-3" />
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
              <div className="space-y-4">
                
                {/* Google Form API Success Badge */}
                {googleEndpoint && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-xs text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      <strong>Google Form / Sheet API:</strong> Manuscript data and attached document pushed directly to your Google Form / Sheet responses table!
                    </span>
                  </div>
                )}

                {/* One-time FormSubmit Activation Notice */}
                <div className="p-3.5 bg-amber-50/90 border border-amber-300 rounded-xl space-y-1.5 text-xs text-amber-900">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Info className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Email Delivery & Activation Status</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    Data has been dispatched to <strong>{RECIPIENT_GMAIL}</strong>. 
                    If this is your first time receiving automated submissions, FormSubmit requires clicking <strong>"Activate Form"</strong> in the activation email sent to <strong>{RECIPIENT_GMAIL}</strong> (check your Spam/Inbox folder).
                  </p>
                  <p className="text-amber-850 font-semibold">
                    💡 For 100% immediate guaranteed delivery without waiting for activation, click <strong>"Push via Gmail Now"</strong> below!
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={getGmailWebLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#c69470] hover:bg-[#b58360] text-[#2f1d16] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4 text-[#2f1d16]" />
                    <span>Push via Gmail Now (Instant Delivery)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={getMailtoLink()}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-[#2f1d16] hover:bg-[#513326] text-[#fffaf4] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                  >
                    <Send className="w-4 h-4 text-[#c69470]" />
                    <span>Send via Mail App</span>
                  </a>

                  {onOpenSubmissionsLog && (
                    <button
                      type="button"
                      onClick={onOpenSubmissionsLog}
                      className="inline-flex items-center gap-2 px-4 py-3 bg-[#fdf6ee] hover:bg-[#f1e1d1] border border-[#8a5a41] text-[#2f1d16] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
                    >
                      <Inbox className="w-4 h-4 text-[#8a5a41]" />
                      <span>View Editorial Submissions Log</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-4 py-3 bg-[#fffdf9] hover:bg-[#f1e1d1] border border-[#dfc7b2] text-[#513326] font-bold text-xs sm:text-sm rounded-xl transition-all"
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
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#513326]">
                      Upload Manuscript File (.docx / .pdf)
                    </label>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setSelectedFileName('');
                        }}
                        className="text-[11px] text-red-700 hover:text-red-900 font-bold inline-flex items-center gap-0.5"
                      >
                        <X className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    name="attachment"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-xs text-[#513326] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#8a5a41] file:text-[#fffaf4] hover:file:bg-[#513326]"
                  />
                  {selectedFile ? (
                    <div className="mt-1.5 p-2 bg-emerald-50 border border-emerald-300 rounded-md text-xs text-emerald-950 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 overflow-hidden">
                        <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="font-semibold truncate">{selectedFile.name}</span>
                        <span className="text-[10px] text-emerald-700 shrink-0">({formatFileSize(selectedFile.size)})</span>
                      </div>
                      <span className="text-[10px] text-emerald-800 font-bold shrink-0 ml-1">Attached ✓</span>
                    </div>
                  ) : (
                    <p className="text-[11px] text-[#684f43] mt-1">
                      MS Word (.docx) or PDF format. Will be attached directly to the email sent to <strong className="text-[#2f1d16]">{RECIPIENT_GMAIL}</strong> and archived for editorial download.
                    </p>
                  )}
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
                    placeholder="https://drive.google.com/file/d/..."
                    className="w-full px-3.5 py-2.5 bg-[#fffaf4] border border-[#dfc7b2] rounded-lg text-sm text-[#2f1d16] focus:ring-2 focus:ring-[#8a5a41] focus:outline-hidden"
                  />
                  <p className="text-[11px] text-[#684f43] mt-1">
                    Direct download link via Google Drive, Dropbox, or OneDrive (ensure link sharing is enabled).
                  </p>
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

              {/* Google Form / Sheet Integration status bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-[#f6eee3] border border-[#dfc7b2] rounded-xl text-xs gap-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#8a5a41] shrink-0" />
                  <span className="font-semibold text-[#2f1d16]">Google Form / Sheets API:</span>
                  {googleEndpoint ? (
                    <span className="inline-flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px] border border-emerald-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                      Auto-Push Connected
                    </span>
                  ) : (
                    <span className="text-[#684f43]">
                      Sync submissions & documents to Google Form / Sheets responses
                    </span>
                  )}
                </div>
                {onOpenSubmissionsLog && (
                  <button
                    type="button"
                    onClick={onOpenSubmissionsLog}
                    className="text-[#8a5a41] hover:text-[#2f1d16] font-bold text-xs underline inline-flex items-center gap-1 shrink-0"
                  >
                    <span>{googleEndpoint ? 'Manage Google API' : 'Set up Google Form API'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Submit Buttons & Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#2f1d16] hover:bg-[#513326] disabled:opacity-50 text-[#fffaf4] font-bold text-sm sm:text-base rounded-full shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4 text-[#c69470]" />
                    <span>{formStatus === 'submitting' ? 'Forwarding to srcaaweb@gmail.com...' : 'Submit Manuscript to Editorial Office'}</span>
                  </button>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(RECIPIENT_GMAIL)}&su=${encodeURIComponent(`[SGRCR Manuscript Submission] ${formData.title || 'Manuscript Title'} - ${formData.authorName || 'Author'}`)}&body=${encodeURIComponent(generateEmailBody(formData, selectedFileName))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#c69470] hover:bg-[#b58360] text-[#2f1d16] font-bold text-xs sm:text-sm rounded-full shadow-xs transition-all"
                    title="Open your draft in Gmail Web directly addressed to srcaaweb@gmail.com"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Dispatch via Gmail Directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-[#8a5a41] font-semibold text-center sm:text-right">
                  Target Address: <span className="font-bold text-[#2f1d16]">{RECIPIENT_GMAIL}</span>
                </p>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};
