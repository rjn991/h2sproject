import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DonationCard } from '../DonationCard';
import React from 'react';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Package: () => <div data-testid="package-icon" />,
  Clock: () => <div data-testid="clock-icon" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
  ChevronRight: () => <div data-testid="chevron-icon" />,
  Tag: () => <div data-testid="tag-icon" />,
}));

const mockDonation = {
  id: '1',
  status: 'pending',
  createdAt: { toDate: () => new Date('2024-03-20T10:00:00Z') },
  items: [
    { name: 'Rice', qty: 5, unit: 'kg', cat: 'food' },
    { name: 'Water', qty: 10, unit: 'L', cat: 'water' },
  ],
  rawText: '5kg rice, 10L water',
};

describe('DonationCard', () => {
  it('renders donation details correctly', () => {
    render(<DonationCard donation={mockDonation} onClaim={() => {}} />);
    
    expect(screen.getByText('Rice')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('kg')).toBeInTheDocument();
    expect(screen.getByText('food')).toBeInTheDocument();
  });

  it('calls onClaim when button is clicked', () => {
    const onClaimSpy = vi.fn();
    render(<DonationCard donation={mockDonation} onClaim={onClaimSpy} />);
    
    const claimButton = screen.getByText('Claim for Camp');
    fireEvent.click(claimButton);
    
    expect(onClaimSpy).toHaveBeenCalledOnce();
  });

  it('disables button and shows claimed status when donation is claimed', () => {
    const claimedDonation = { ...mockDonation, status: 'claimed' };
    render(<DonationCard donation={claimedDonation} onClaim={() => {}} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Already Claimed')).toBeInTheDocument();
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });

  it('shows raw text when provided', () => {
    render(<DonationCard donation={mockDonation} onClaim={() => {}} />);
    expect(screen.getByText(/5kg rice, 10L water/)).toBeInTheDocument();
  });
});
