import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { IntentProvider } from '@/context/IntentContext';
import { ToastProvider } from '@/context/ToastContext';
import { JargonDrawerProvider } from '@/context/JargonDrawerContext';
import { AppShell } from '@/components/layout/AppShell';

import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { ComparePage } from '@/pages/ComparePage';
import { LearnPage } from '@/pages/LearnPage';
import { SavedPage } from '@/pages/SavedPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <IntentProvider>
        <ToastProvider>
          <JargonDrawerProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppShell />}>
                  <Route index element={<HomePage />} />
                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="compare" element={<ComparePage />} />
                  <Route path="learn" element={<LearnPage />} />
                  <Route path="saved" element={<SavedPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </JargonDrawerProvider>
        </ToastProvider>
      </IntentProvider>
    </ThemeProvider>
  );
};

export default App;
