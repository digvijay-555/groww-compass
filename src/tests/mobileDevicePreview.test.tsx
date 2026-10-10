import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MobileDevicePreview } from '@/components/layout/MobileDevicePreview';

describe('MobileDevicePreview Component', () => {
  it('renders children inside the scrollable phone viewport', () => {
    render(
      <MobileDevicePreview>
        <div data-testid="test-child">Child Content</div>
      </MobileDevicePreview>
    );

    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();

    const scrollViewport = document.getElementById('phone-scroll-viewport');
    expect(scrollViewport).toBeInTheDocument();
    expect(scrollViewport).toContainElement(child);
    expect(scrollViewport).toHaveClass('overflow-y-auto');
  });

  it('provides a dedicated portal mount for in-phone dialogs and overlays', () => {
    render(
      <MobileDevicePreview>
        <div>App Body</div>
      </MobileDevicePreview>
    );

    const portalMount = document.getElementById('phone-screen-portal');
    expect(portalMount).toBeInTheDocument();
    expect(portalMount).toHaveClass('absolute');
    expect(portalMount).toHaveClass('inset-0');
    expect(portalMount).toHaveClass('pointer-events-none');
  });

  it('renders the smartphone frame chassis and simulated status bar on desktop', () => {
    render(
      <MobileDevicePreview>
        <div>App Body</div>
      </MobileDevicePreview>
    );

    const phoneFrame = screen.getByLabelText(/smartphone frame viewport/i);
    expect(phoneFrame).toBeInTheDocument();
    expect(phoneFrame).toHaveClass('relative');

    // Status bar time
    expect(screen.getByText('9:41')).toBeInTheDocument();
    expect(screen.getByText('5G')).toBeInTheDocument();

    // Desktop guidance bar
    expect(screen.getByText(/interactive mobile prototype/i)).toBeInTheDocument();
  });
});
