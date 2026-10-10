import React from 'react';
import { Outlet } from 'react-router-dom';
import { MobileDevicePreview } from './MobileDevicePreview';
import { MobileHeader } from './MobileHeader';
import { BottomNavigation } from './BottomNavigation';

export const AppShell: React.FC = () => {
  return (
    <MobileDevicePreview>
      {/* Compact Mobile Header */}
      <MobileHeader />

      {/* Main Content View with generous bottom padding so bottom nav NEVER covers content */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full px-4 pt-3 pb-28 pb-safe focus:outline-none"
      >
        <Outlet />
      </main>

      {/* Fixed Mobile Bottom Navigation */}
      <BottomNavigation />
    </MobileDevicePreview>
  );
};
