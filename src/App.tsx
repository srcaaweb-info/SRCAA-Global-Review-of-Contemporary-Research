import React, { useState, useEffect } from 'react';
import { CookieBanner } from './components/CookieBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickNav } from './components/QuickNav';
import { AboutSection } from './components/AboutSection';
import { JournalMetadataSection } from './components/JournalMetadataSection';
import { AuthorGuidelinesSection } from './components/AuthorGuidelinesSection';
import { EditorialBoardSection } from './components/EditorialBoardSection';
import { PoliciesSection } from './components/PoliciesSection';
import { IssnSection } from './components/IssnSection';
import { ArchivesSection } from './components/ArchivesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArticleArchiveView } from './components/ArticleArchiveView';
import { ResponsiveBar, ViewportMode } from './components/ResponsiveBar';

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'archive'>('main');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');
  const [isTesterVisible, setIsTesterVisible] = useState(true);

  // Check URL params on initial load (e.g. ?view=archive or ?tab=archive)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'archive' || params.get('tab') === 'archive') {
      setCurrentView('archive');
    }
  }, []);

  const handleOpenArticleArchive = () => {
    // Also update current view if needed, though window.open('/archive.html') opens a separate tab
    // We can also allow switching inside the same window
    window.open('/archive.html', '_blank', 'noopener,noreferrer');
  };

  // Determine wrapper styling based on viewport preview mode
  const getContainerStyle = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[420px] mx-auto my-6 shadow-2xl rounded-3xl border-8 border-[#2f1d16] overflow-hidden bg-[#fffaf4] min-h-screen';
      case 'laptop':
        return 'max-w-[1080px] mx-auto my-6 shadow-2xl rounded-2xl border-4 border-[#2f1d16] overflow-hidden bg-[#fffaf4] min-h-screen';
      case 'lab':
        return 'max-w-[1440px] mx-auto shadow-lg bg-[#fffaf4] min-h-screen';
      case 'full':
      default:
        return 'w-full bg-[#fffaf4] min-h-screen';
    }
  };

  return (
    <div className={`transition-all duration-300 ${viewportMode !== 'full' ? 'bg-[#231510] py-6 px-2 sm:px-4 min-h-screen overflow-x-auto' : ''}`}>
      
      {/* Device frame / preview wrapper */}
      <div className={getContainerStyle()}>
        
        {viewportMode !== 'full' && (
          <div className="bg-[#2f1d16] text-[#e6bd94] px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-[#513326]">
            <span>
              {viewportMode === 'mobile' && '📱 Mobile Preview (400px width)'}
              {viewportMode === 'laptop' && '💻 Laptop Preview (1024px width)'}
              {viewportMode === 'lab' && '🔬 Lab / Widescreen Preview (1440px width)'}
            </span>
            <button
              type="button"
              onClick={() => setViewportMode('full')}
              className="text-[#dfc7b2] hover:text-[#fffaf4] underline text-[11px]"
            >
              Reset to Full Screen
            </button>
          </div>
        )}

        {currentView === 'archive' ? (
          <ArticleArchiveView onBackToMain={() => setCurrentView('main')} />
        ) : (
          <div className="flex flex-col min-h-screen">
            <CookieBanner />
            <Navbar onOpenArticleArchive={handleOpenArticleArchive} />
            <main className="flex-1">
              <Hero />
              <QuickNav />
              <AboutSection />
              <JournalMetadataSection />
              <AuthorGuidelinesSection />
              <EditorialBoardSection />
              <PoliciesSection />
              <IssnSection />
              <ArchivesSection />
              <ContactSection />
            </main>
            <Footer />
          </div>
        )}
      </div>

      {/* Floating Viewport Tester Controls for Mobile, Laptop, and Lab */}
      <ResponsiveBar
        currentMode={viewportMode}
        onModeChange={setViewportMode}
        isVisible={isTesterVisible}
        onToggleVisible={() => setIsTesterVisible((v) => !v)}
      />
    </div>
  );
}
