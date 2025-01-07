import React from 'react';

interface DropdownProps {
  filteredData: string[];
  searchHistory: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ filteredData, searchHistory, onSelect, onRemove }) => {
  return (
    <ul className="dropdown-list">
      {filteredData.map((item, index) => (
        <li data-testid="dropdown-item" key={index} onClick={() => onSelect(item)} className={searchHistory.includes(item) ? "dropdown-item highlight" : "dropdown-item"}>
          <span data-testid="list-item">{item}</span>
          <button onClick={(e) => { e.stopPropagation(); onRemove(item); }}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
