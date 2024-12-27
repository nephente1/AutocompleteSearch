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
        <li key={index} onClick={() => onSelect(item)} className={searchHistory.includes(item) ? "dropdown-item highlight" : "dropdown-item"}>
          <span >{item}</span>
          <button onClick={(e) => { e.stopPropagation(); onRemove(item); }}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
