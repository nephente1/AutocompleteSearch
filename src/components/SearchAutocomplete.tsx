

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "../components/Dropdown";
import { localDB, mockData } from "../utils";

export interface filteredResultsTypes {
  id: number;
  title: string;
  description: string;
  url: string;
}

interface SearchAutocompleteProps {
  setResults: (results: Array<filteredResultsTypes>) => void;
}

const SearchAutocomplete = ({setResults}: SearchAutocompleteProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [filteredData, setFilteredData] = useState<string[]>(mockData);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchMetadata, setSearchMetadata] = useState<{ count: number; time: number }>({
    count: 0,
    time: 0,
  });
  const refElement = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setSearchTerm(value);
    const suggestions = mockData.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );
    const suggestions2 = searchHistory.filter((item) =>
      item.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredData([...new Set(suggestions2.concat(suggestions).slice(0, 10))]);
    setIsFocused(true);
  };

  const handleFocus = (): void => setIsFocused(true);
  
  const handleRemove = (item: string): void => {
    setFilteredData((prev) => prev.filter((i) => i !== item));
    setSearchHistory((prev) => prev.filter((i) => i !== item));
  };

  const handleSelect = (item: string): void => {
    setSearchTerm(item);
    setIsFocused(false);
  };

  const handleSearch = useCallback(() => {
    const startTime = performance.now();
    const filteredResults = localDB.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const endTime = performance.now();

    setResults(filteredResults);
    setSearchMetadata({
      count: filteredResults.length,
      time: endTime - startTime,
    });

    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory([searchTerm, ...searchHistory]);
    }

    setIsFocused(false);
  }, [searchTerm, searchHistory, setResults]);

  const handleClickOutside = (event: MouseEvent) => {
    if (refElement.current && !refElement.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, searchTerm]);
  
  return(
    <>
      <label htmlFor="search">Search autocomplete</label>
      <div className="flex search-wrapper" ref={refElement}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder="Search..."
          autoFocus
        />
        {isFocused && (
          <Dropdown 
            filteredData={filteredData} 
            searchHistory={searchHistory} 
            onSelect={handleSelect} 
            onRemove={handleRemove} 
          />
        )}
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      {searchMetadata.count > 0 && (
        <div className="search-metadata">
          <p>
            Found {searchMetadata.count} results in {searchMetadata.time.toFixed(2)} ms.
          </p>
        </div>
      )}
    </>
  )
}

export default SearchAutocomplete;