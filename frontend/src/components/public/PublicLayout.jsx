import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteModal from './QuoteModal';
import { siteConfigService, statService } from '../../services/resources';

export default function PublicLayout() {
  const [config, setConfig] = useState(null);
  const [stats, setStats] = useState([]);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    siteConfigService.get().then(setConfig).catch(() => setConfig({}));
    statService.getPublic().then(setStats).catch(() => setStats([]));
  }, []);

  return (
    <>
      <Navbar config={config} onOpenQuote={() => setQuoteOpen(true)} />
      <main>
        <Outlet context={{ config, stats }} />
      </main>
      <Footer config={config} stats={stats} onOpenQuote={() => setQuoteOpen(true)} />
      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </>
  );
}
