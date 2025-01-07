import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dropdown from '../components/Dropdown'; // Zaktualizuj ścieżkę importu

describe('Dropdown', () => {
  const mockOnSelect = vi.fn();
  const mockOnRemove = vi.fn();

  const setup = (filteredData: string[], searchHistory: string[] = []) => {
    render(
      <Dropdown 
        filteredData={filteredData} 
        searchHistory={searchHistory} 
        onSelect={mockOnSelect} 
        onRemove={mockOnRemove} 
      />
    );
  };

  it('renders dropdown items based on filteredData', () => {
    const filteredData = ['test1', 'test2', 'test3'];
    setup(filteredData);

    const items = screen.getAllByTestId('list-item');
    expect(items.length).toBe(filteredData.length);
    expect(items[0]).toHaveTextContent('test1');
    expect(items[1]).toHaveTextContent('test2');
    expect(items[2]).toHaveTextContent('test3');
  });

  it('calls onSelect when an item is clicked', () => {
    const filteredData = ['test1', 'test2'];
    setup(filteredData);

    const itemToClick = screen.getByText('test1');
    fireEvent.click(itemToClick.closest('[data-testid="dropdown-item"]'));

    expect(mockOnSelect).toHaveBeenCalledWith('test1');
  });

  it('calls onRemove when remove button is clicked', () => {
    const filteredData = ['test1'];
    setup(filteredData);

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledWith('test1');
  });

  it('highlights items in search history', () => {
    const filteredData = ['test1', 'test2'];
    const searchHistory = ['test1'];
    setup(filteredData, searchHistory);

    const highlightedItem = screen.getByText('test1').closest('[data-testid="dropdown-item"]');
    
    expect(highlightedItem).toHaveClass('highlight'); // Sprawdź, czy klasa highlight jest obecna
  });

  it('does not highlight items not in search history', () => {
    const filteredData = ['test1', 'test2'];
    const searchHistory = [];
    setup(filteredData, searchHistory);

    const nonHighlightedItem = screen.getByText('test1').closest('[data-testid="dropdown-item"]');

    expect(nonHighlightedItem).not.toHaveClass('highlight'); // Sprawdź, czy klasa highlight nie jest obecna
  });
});
