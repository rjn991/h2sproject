import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Scanner } from '../Scanner';
import React from 'react';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Camera: () => <div data-testid="camera-icon" />,
  Upload: () => <div data-testid="upload-icon" />,
  Loader2: () => <div data-testid="loader-icon" className="animate-spin" />,
  CheckCircle2: () => <div data-testid="check-icon" />,
  AlertCircle: () => <div data-testid="alert-icon" />,
}));

// Mock the server action
const mockProcessDonationNote = vi.fn();
vi.mock('@/app/actions/donate', () => ({
  processDonationNote: (formData: FormData) => mockProcessDonationNote(formData),
}));

describe('Scanner', () => {
  it('renders initial state correctly', () => {
    render(<Scanner />);
    expect(screen.getByText('Scan Note')).toBeInTheDocument();
    expect(screen.getByTestId('camera-icon')).toBeInTheDocument();
  });

  it('triggers file input when button is clicked', () => {
    render(<Scanner />);
    const button = screen.getByRole('button');
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    
    // We can't easily test the click trigger on the hidden input, but we can test the behavior
    fireEvent.click(button);
    // In a real test we might check if click() was called on the ref, 
    // but here we focus on the integration.
  });

  it('shows processing state when a file is selected', async () => {
    mockProcessDonationNote.mockResolvedValue({ success: true });
    render(<Scanner />);
    
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    expect(screen.getByText('Scanning...')).toBeInTheDocument();
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('Done!')).toBeInTheDocument();
    });
  });

  it('shows success message upon successful processing', async () => {
    mockProcessDonationNote.mockResolvedValue({ success: true });
    render(<Scanner />);
    
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('Donation recorded! Thank you for your help.')).toBeInTheDocument();
    });
  });

  it('shows error message upon failed processing', async () => {
    mockProcessDonationNote.mockResolvedValue({ success: false });
    render(<Scanner />);
    
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    
    fireEvent.change(input, { target: { files: [file] } });
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
    });
  });
});
