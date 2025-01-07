import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import ResultsList from '../components/ResultsList'; // Zaktualizuj ścieżkę importu
import { filteredResultsTypes } from '../components/SearchAutocomplete'; // Upewnij się, że ścieżka jest poprawna

describe('ResultsList', () => {
  const mockResults: Array<filteredResultsTypes> = [
    {
      id: 1,
      title: 'Test Title 1',
      description: 'Description for test title 1',
      url: 'https://example.com/1',
    },
    {
      id: 2,
      title: 'Test Title 2',
      description: 'Description for test title 2',
      url: 'https://example.com/2',
    },
  ];

  it('renders results correctly', () => {
    render(<ResultsList results={mockResults} />);
    
    // Sprawdź, czy elementy listy są renderowane
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockResults.length);

    // Sprawdź zawartość pierwszego elementu
    expect(screen.getByText('Test Title 1')).toBeInTheDocument();
    expect(screen.getByText('Description for test title 1')).toBeInTheDocument();
    
    // Sprawdź zawartość drugiego elementu
    expect(screen.getByText('Test Title 2')).toBeInTheDocument();
    expect(screen.getByText('Description for test title 2')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<ResultsList results={mockResults} />);
    
    // Sprawdź linki
    const link1 = screen.getByText('Test Title 1').closest('a');
    const link2 = screen.getByText('Test Title 2').closest('a');

    expect(link1).toHaveAttribute('href', 'https://example.com/1');
    expect(link2).toHaveAttribute('href', 'https://example.com/2');
    
    // Sprawdź atrybut target i rel
    expect(link1).toHaveAttribute('target', '_blank');
    expect(link1).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(link2).toHaveAttribute('target', '_blank');
    expect(link2).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
