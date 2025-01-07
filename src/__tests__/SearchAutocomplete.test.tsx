import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchAutocomplete from '../components/SearchAutocomplete'; // Zaktualizuj ścieżkę importu

describe('SearchAutocomplete', () => {
  it('renders input and button', () => {
    render(<SearchAutocomplete />);
    
    const input = screen.getByTestId('input-search');
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays suggestions on input change', () => {
    render(<SearchAutocomplete />);
    
    const input = screen.getByTestId('input-search');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Zakładając, że mockData zawiera 'test1' i 'test2'
    const suggestionItems = screen.getAllByRole('list'); // Zaktualizuj rolę
    
    expect(suggestionItems.length).toBeGreaterThan(0);
  });


  it('calls setResults with correct data on search button click', () => {
    const setResultsMock = vi.fn();
    render(<SearchAutocomplete setResults={setResultsMock} />);
    
    const input = screen.getByTestId('input-search');
    
    fireEvent.change(input, { target: { value: 'test' } });
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(setResultsMock).toHaveBeenCalled(); // Możesz dodać więcej asercji w zależności od logiki
  });

  it('handles click outside to close suggestions', () => {
    render(<SearchAutocomplete />);
    
    const input = screen.getByTestId('input-search');
    
    fireEvent.focus(input);
    
    // Zakładając, że dropdown jest widoczny po focusie
    expect(screen.getByRole('list')).toBeInTheDocument(); // Upewnij się, że dropdown jest widoczny
    
    fireEvent.click(document.body); // Kliknięcie poza komponent
    
    expect(screen.queryByRole('list')).not.toBeInTheDocument(); // Sprawdź, czy dropdown został zamknięty
  });
});

