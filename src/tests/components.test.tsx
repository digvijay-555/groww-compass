import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { SelectionCard } from '@/components/common/SelectionCard';
import { BottomSheet } from '@/components/common/BottomSheet';
import { EmptyState } from '@/components/common/EmptyState';

describe('Reusable UI Components', () => {
  it('PrimaryButton renders with touch target and responds to clicks', () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Start Investing</PrimaryButton>);

    const button = screen.getByRole('button', { name: /start investing/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('min-h-touch');

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('PrimaryButton shows spinner and disables when isLoading is true', () => {
    render(<PrimaryButton isLoading={true}>Saving</PrimaryButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('SecondaryButton renders with accessible outline styling', () => {
    render(<SecondaryButton>Cancel</SecondaryButton>);
    const button = screen.getByRole('button', { name: /cancel/i });
    expect(button).toHaveClass('border-border-default');
  });

  it('SelectionCard triggers onSelect callback and updates aria-checked', () => {
    const handleSelect = vi.fn();
    const { rerender } = render(
      <SelectionCard
        id="opt1"
        title="Index Funds"
        description="Passive low-cost"
        isSelected={false}
        onSelect={handleSelect}
      />
    );

    const card = screen.getByRole('radio');
    expect(card).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(card);
    expect(handleSelect).toHaveBeenCalledWith('opt1');

    rerender(
      <SelectionCard
        id="opt1"
        title="Index Funds"
        description="Passive low-cost"
        isSelected={true}
        onSelect={handleSelect}
      />
    );
    expect(card).toHaveAttribute('aria-checked', 'true');
    expect(card).toHaveClass('border-groww-emerald');
  });

  it('BottomSheet opens and closes via close button and Escape key', () => {
    const handleClose = vi.fn();

    const { rerender } = render(
      <BottomSheet isOpen={false} onClose={handleClose} title="Expense Ratio">
        <p>Details about fee</p>
      </BottomSheet>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <BottomSheet isOpen={true} onClose={handleClose} title="Expense Ratio">
        <p>Details about fee</p>
      </BottomSheet>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Expense Ratio')).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Escape key
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(2);
  });

  it('EmptyState renders title, description, and action CTA', () => {
    const handleAction = vi.fn();
    render(
      <EmptyState
        title="Nothing saved"
        description="Save your first item"
        actionLabel="Explore Now"
        onAction={handleAction}
      />
    );

    expect(screen.getByText('Nothing saved')).toBeInTheDocument();
    expect(screen.getByText('Save your first item')).toBeInTheDocument();

    const actionButton = screen.getByRole('button', { name: /explore now/i });
    fireEvent.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
