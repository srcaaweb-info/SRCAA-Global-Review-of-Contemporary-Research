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

export default function App() {
  const [currentView, setCurrentView] = useState<'main' | 'archive'>('main');

  // Check URL params on initial load (e.g. ?view=archive or ?tab=archive)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'archive' || params.get('tab') === 'archive') {
      setCurrentView('archive');
    }
  }, []);

  const handleOpenArticleArchive = () => {
    try {
      window.open('/archive.html', '_blank', 'noopener,noreferrer');
    } catch {
      // In case window.open is blocked in preview iframe
    }
    setCurrentView('archive');
  };

  return (
    <div className="w-full bg-[#fffaf4] min-h-screen">
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
            <ArchivesSection onOpenArchives={handleOpenArticleArchive} />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}
