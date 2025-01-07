import React from 'react';

interface DropdownProps {
  filteredData: string[];
  searchHistory: string[];
  onSelect: (item: string) => void;
  onRemove: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ filteredData, searchHistory, onSelect, onRemove }) => {
  return (
    <ul className="top-full right-0 left-0 absolute bg-[#f4f4f4] border-4 border-purple-400 rounded p-0 list-style-none">
      {filteredData.map((item, index) => (
        <li data-testid="dropdown-item" key={index} onClick={() => onSelect(item)} className={searchHistory.includes(item) ? "dropdown-item text-[#646cff]" : "dropdown-item"}>
          <span data-testid="list-item">{item}</span>
          <button className="bg-purple-400" onClick={(e) => { e.stopPropagation(); onRemove(item); }}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
